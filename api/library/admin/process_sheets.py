from typing import Collection
from models import SubmitSheet, User

from library import DateTimeValidator


class ProcessSheets:

    def __init__(self) -> None:

        self.new_submission = None
        
        self.DateTime = DateTimeValidator()
        self.date_time = "{}, {}".format(self.DateTime.get_date, self.DateTime.current_time())

    def view_submission_sheets(self) -> dict:

        submitted_sheets: Collection = SubmitSheet.all()
        
        if len(submitted_sheets) == 0:
            return {
                "message"   : "You have no Submitted Timesheets at the moment",
                "error"     : True
            }

        return {
            "message"   : "Timesheet submission found",
            "error"     : False,
            "submitted_sheets": [
                submitted_sheet.json() for submitted_sheet in submitted_sheets
            ]
        }

    def insert_submission_sheet(self, user_id: int, comment: str) -> int:

        submitted_sheet: SubmitSheet = SubmitSheet.where('user_id', user_id).first()

        self.new_submission = SubmitSheet.create(
                                        user_id=user_id,
                                        comment=comment,
                                        date_time=str(self.date_time)
                                        )

        if not submitted_sheet:

            # Since previous submission does not exist, we insert
            return self.save_submission()

        # Since previous submission exists, we delete is then insert the new one
        submitted_sheet.delete()
        return self.save_submission()
            

    def save_submission(self) -> dict:

        try:

            self.new_submission.save()
            return {
                "error"     : False,
                "message"   : "Timesheet Submitted to Admin Successfully"
            }

        except:
            return {
                "error"     : True,
                "message"   : "Timesheet Submission to Admin Unsuccessful"
            }