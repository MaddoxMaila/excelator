from typing import Collection, Type
import models
from db import db
from orator.orm import has_many
import library



class User(db.Model):

    __table__ = 'users'
    __primary_key__ = 'user_id'
    __fillable__ = [
        'name',
        'surname',
        'username',
        'email',
        'type',
        'password'
        ]

    @has_many
    def timesheet(self):
        return models.TimeSheet

    def json(self) -> dict:
        return {
            "name"      : self.name,
            "surname"   : self.surname,
            "username"  : self.username,
            "type"      : self.type,
            "user_id"   : self.user_id,
            "user_extras" : self.metadata()
        }

    def metadata(self) -> dict:
        date_time: library.DateTimeValidator = library.DateTimeValidator()
        user_timesheets: Collection = self.timesheet()

        billable_time = [
            date_time.make_time(date_time.remove_trailing_time_zeros(tmSheet.total_time)) for tmSheet in user_timesheets.where('bill', 'Billable').get_results()
            ]

        non_billable_time = [
            date_time.make_time(date_time.remove_trailing_time_zeros(tmSheet.total_time)) for tmSheet in user_timesheets.where('bill', 'Non-Billable').get_results()
            ]

        return {
            "billable_time"       : date_time.remove_trailing_time_zeros(str(date_time.time_sum(billable_time))),
            "non_billable_time"   : date_time.remove_trailing_time_zeros(str(date_time.time_sum(non_billable_time))),
        }
