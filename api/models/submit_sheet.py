from db import db
import models

from orator.orm import belongs_to

class SubmitSheet(db.Model):

    __table__ = 'sheet_submit'
    __primary_key__ = 'sheet_submit_id'
    __fillable__= [
        'sheet_submit_id',
        'user_id',
        'comment',
        'date_time'
    ]

    @belongs_to
    def user(self):
        return models.User

    def json(self) -> dict:
        return {
            'sheet_submit_id'           : self.sheet_submit_id,
            'user_id'                   : self.user_id,
            'comment'                   : self.comment,
            'date_time'                 : self.date_time,
            'user'                      : self.get_user()
        }

    def get_user(self):
        
        user: models.User = models.User.where('user_id', self.user_id).first()

        if user:
            return user.json()
        return {}