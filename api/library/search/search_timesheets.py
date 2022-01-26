
from typing import Collection
import models

class SearchTimesheets:
    
    @staticmethod
    def search_timesheet(q: str) -> dict:

        if q == '' or len(q) == 0 :
            return {
                "error"     : True,
                "message"   : "Your search query is empty"
            }

        tmSheet: Collection = models.TimeSheet.where('client_project_name', 'like', '{}%'.format(q))\
                                              .where('client', 'like', '{}%'.format(q))\
                                              .where('bill', 'like', '{}%'.format(q))\
                                              .where('client_project_name', 'like', '{}%'.format(q))\
                                              .where('description', 'like', '{}%'.format(q))\
                                              .where('comment', 'like', '{}%'.format(q))\
                                              .where('total_time', 'like', '{}%'.format(q))\
                                              .where('start_time', 'like', '{}%'.format(q))\
                                              .where('end_time', 'like', '{}%'.format(q)).get()

        