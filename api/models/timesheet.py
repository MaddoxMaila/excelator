from typing import Type
import models
from db import db
from orator.orm import belongs_to

import library

class TimeSheet(db.Model):

    __table__ = 'time_sheets'
    __primary_key__ = 'time_sheet_id'
    __fillable__ = [
        'user_id',
        'date',
        'month',
        'day',
        'client',
        'client_project_name',
        'description',
        'bill',
        'comment',
        'total_time',
        'start_time',
        'end_time',
        'time_sheet_id'
    ]

    '''
        Establish a relationship between the Timesheet and User
    '''
    @belongs_to
    def user(self):
        return models.User

    def json(self) -> dict:
        
        date_time: library.DateTimeValidator = library.DateTimeValidator()
        # week_number: int =

        return {
            "user_id"         : self.user_id,
            "client"                : self.client,
            "client_project_name"   : self.client_project_name,
            "date"                  : self.date,
            "month"                 : self.month,
            "day"                   : self.day,
            "description"           : self.description,
            "bill"                  : self.bill,
            "comment"               : self.comment,
            "total_time"            : self.total_time,
            "start_time"            : self.start_time,
            "end_time"              : self.end_time,
            "time_sheet_id"         : self.time_sheet_id
        }

