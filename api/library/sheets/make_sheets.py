from typing import Type
from library.time.time_validator import DateTimeValidator
from models import User
from models import TimeSheet
from orator import Collection
from db import db

class MakeTimeSheet:
    """
        Holds most if not all methods & logic related to Timesheets, such as
        Saving them to DB, Extracting, Deleting, & Updating
    """

    def __init__(self, auth_user: Type[User]) -> None:
        """
        Initialize with the auth user for ease of access

        Args:
            auth_user (Type[User]): the Authenticated user
        """

        '''
            This holds the authenticated user
        '''
        self.auth_user: Type[User] = auth_user
        self.bill: list = ['Billable', 'Non-Billable']

        self.DateTime = DateTimeValidator()

    def save_user_timesheet_entry(
        self,
        client: str,
        client_project_name: str,
        description: str,
        bill: str,
        comment: str,
        start_time: str,
        end_time: str
    ) -> dict:
        """
        Receives all required data, validates it then saves it to the DB 

        Args:
            client_project_name (str): name of the project the consultant is working on
            description (str): short description of the project
            bill (str): Either Billable or Non Billable
            comment (str): Detailed comment of what the consultant was doing
            start_time (str): time started working on the project on that day
            end_time (str): time ended working on the project on that day

        Returns:
            dict: Either saved failed or success
        """

        '''
            Check for correct billing
        '''
        if bill not in self.bill:
            return {
                "error": True,
                "message": "Your billing is invalid"
            }

        '''
            Date & Time Validations to come here
        '''
        date = self.DateTime.get_date()
        month = self.DateTime.get_month()
        day = self.DateTime.get_day()
        
        time_ok, total_time = self.DateTime.time_difference(start_time, end_time)

        if not time_ok:
            return {
                "error": True,
                "message": "Start Time cannot be greater than End Time"
            }
            
        '''
            Save timesheet entry
        '''
        timesheet_entry = TimeSheet.create(
            user_id=self.auth_user.user_id,
            date=date,
            month=month,
            day=day,
            client=client,
            client_project_name=client_project_name,
            description=description,
            bill=bill,
            comment=comment,
            total_time=str(total_time),
            start_time=start_time,
            end_time=end_time
        )

        '''
            Exception handling for DB errors that might arise
        '''
        try:

            '''
                Save the entry to the database
            '''
            timesheet_entry.save()
        except:
            return {
                "error": True,
                "message": "Failed to save Timesheet Entry"
            }
        
        return {
            "error": False,
            "message": "Timesheet Entry saved successful"
        }

    def delete_sheet_entry(self, entry_id: int) -> dict:

        timeSheet: TimeSheet = self.auth_user.timesheet().where('time_sheet_id', entry_id)

        if timeSheet.first() is None:
            return {
                "error"     : True,
                "message"   : "This sheet entry does not exist"
            }

        try:
            timeSheet.delete()
            return{
                "error"         : False,
                "message"       : "Sheet entry deleted successful"
            }
        except:
            return {
                "error"         : False,
                "message"       : "Sheet entry deletion unsuccessful"
            }

    def retrieve_user_timesheet(
            self, user_id: int,
            month: str=None,
            date: str=None,
            start_date: str=None,
            end_date: str=None
        ) -> dict:
        
        user: User = User.all().where('user_id', user_id).first()

        if user is None:
            return {
                "error": True,
                "message": "User not found"
            }

        response: dict = {
            "message": "user information found",
            "error": False,
            "user": user.json(),
        }

        if month is not None:
            if month == 'current':
                response["entries"] = self.get_timesheet_by_month(user=user, month=self.DateTime.get_month())
            else:
                response["entries"] = self.get_timesheet_by_month(user=user, month=month)

        elif date is not None:
            response["entries"] = self.get_timesheet_by_date(user=user, date=date)
        elif start_date is not None and end_date is not None:
            response["entries"] = self.get_time_interval_timesheet(user=user, start_date=start_date, end_date=end_date)
        else:
            response["entries"] = self.get_all(user=user)

        response["sheet_metadata"] = self.timesheet_metadata(response['entries']) 
        
        return response

    def get_all(self, user: User) -> dict:
        return self.generator(user=user)

    def get_time_interval_timesheet(self, user: User, start_date: str, end_date: str) -> list: # For now
        # startDateEntry = TimeSheet.all().where('user_id', user.user_id).where('date', start_date).first()
        # endDateEntry = TimeSheet.all().where('user_id', user.user_id).where('date', end_date).first()

        timesheetCollection: Collection = db.table('time_sheets').where_between('date', [start_date, end_date]).get()

        # print(timesheetCollection)
        # print([sheet_entry for sheet_entry in timesheetCollection])
        return [{'user_id':sheet_entry['user_id'],
                'time_sheet_id':sheet_entry['time_sheet_id'],
                'date':sheet_entry['date'],
                'month':sheet_entry['month'],
                'day':sheet_entry['day'],
                'client':sheet_entry['client'],
                'client_project_name':sheet_entry['client_project_name'],
                'description':sheet_entry['description'],
                'bill':sheet_entry['bill'],
                'comment':sheet_entry['comment'],
                'total_time':sheet_entry['total_time'],
                'start_time':sheet_entry['start_time'],
                'end_time':sheet_entry['end_time']} for sheet_entry in timesheetCollection]

    def get_timesheet_by_month(self, user: User, month: str) -> dict:
        # print([c.json() for c in timesheets.get_results()])
        return self.generator(user, 'month', month)

    def get_timesheet_by_date(self, user: User, date: str) -> list:
        return self.generator(user, 'date', date)

    def generator(self, user: User, table: str = None, value: str = None) -> list:

        if table is None and value is None:
            timesheets: Collection = user.timesheet().get_results()
        else:
            timesheets: Collection = user.timesheet().where(table, value).get_results()

        return [self.model_timesheet_data(sheet_entry) for sheet_entry in timesheets]

    def model_timesheet_data(self, sheet_entry: TimeSheet) -> dict:
        return sheet_entry.json()
    
    def timesheet_metadata(self, sheet_entries: list) -> dict:

        resp: dict = {}
        non_billable: list = []
        billable: list = []
        days: list     = []

        if len(sheet_entries) == 0:
            return resp

        for sheet_entry in sheet_entries:

            if sheet_entry['bill'] == 'Non-Billable':
                non_billable.append(self.DateTime.make_time(self.DateTime.remove_trailing_time_zeros(time=sheet_entry['total_time'])))

            if sheet_entry['bill'] == 'Billable':
                billable.append(self.DateTime.make_time(self.DateTime.remove_trailing_time_zeros(time=sheet_entry['total_time'])))

        days.append(sheet_entry['day'])

        return {
            "days_worked"       : len(set(days)),
            "non_billable_time" : self.DateTime.remove_trailing_time_zeros(time=str(self.DateTime.time_sum(non_billable))),
            "billable_time"     : self.DateTime.remove_trailing_time_zeros(time=str(self.DateTime.time_sum(billable)))
        }