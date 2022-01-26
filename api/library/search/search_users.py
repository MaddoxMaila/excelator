from typing import Collection
from db import db
import models

class SearchUsers:
    
    @staticmethod
    def find_user(q: str) -> dict:

        if len(q) == 0 or q == '':
            return {
                "error": True,
                "message": "Search string cannot be empty"
            }

        user_list: Collection = models.User.where('username', 'like', '{}%'.format(q)).or_where('name', 'like', '{}%'.format(q)).or_where('surname', 'like', '{}%'.format(q)).get()

        return {
            "error"         : True,
            "message"       : "Users found",
            "users"         : [
                                user.json() for user in user_list
                            ]
        }
        