from datetime import date
from typing import Type
from flask_restful import Resource, reqparse
from flask_jwt_extended import get_current_user, jwt_required

from models import User

from library import MakeTimeSheet, Authentication

save_sheet_entry_parse: Type[reqparse.RequestParser] = reqparse.RequestParser()

save_sheet_entry_parse.add_argument('client_name', type=str, required=True, help="Missing a Client Name field")
save_sheet_entry_parse.add_argument('project_name', type=str, required=True, help="Missing a Project Name field")
save_sheet_entry_parse.add_argument('description', type=str, required=True, help="Missing a Description field")
save_sheet_entry_parse.add_argument('bill', type=str, required=True, help="Missing a Billing field")
save_sheet_entry_parse.add_argument('comment', type=str, required=True, help="Missing a Comment field")
save_sheet_entry_parse.add_argument('start_time', type=str, required=True, help="Missing a Start Time field")
save_sheet_entry_parse.add_argument('end_time', type=str, required=True, help="Missing an End Time field")

get_sheet_parse: Type[reqparse.RequestParser] = reqparse.RequestParser()

get_sheet_parse.add_argument('month', type=str, required=False)
get_sheet_parse.add_argument('date', type=str, required=False)
get_sheet_parse.add_argument('sheet_from', type=str, required=False)
get_sheet_parse.add_argument('sheet_to', type=str, required=False)
get_sheet_parse.add_argument('user_id', type=int, required=False)

delete_sheet_entry_parse: Type[reqparse.RequestParser] = reqparse.RequestParser()

delete_sheet_entry_parse.add_argument('id', type=int, required=True, help="Missing Id field")
    

class TimeSheetResource(Resource):
    
    @jwt_required()
    def post(self, action) -> dict:

        sheet_data = save_sheet_entry_parse.parse_args()

        for sheet_data_item in sheet_data.values():
            if sheet_data_item == '':
                return {
                    "message": "Make sure all fields are filled in",
                    "error"  : True,
                }

        auth_user = get_current_user()
        makeTimeSheets = MakeTimeSheet(auth_user)

        return makeTimeSheets.save_user_timesheet_entry(
            sheet_data['client_name'],
            sheet_data['project_name'],
            sheet_data['description'],
            sheet_data['bill'],
            sheet_data['comment'],
            sheet_data['start_time'],
            sheet_data['end_time']
        )


    @jwt_required()
    def get(self, action) -> dict:

        sheet_params = get_sheet_parse.parse_args()

        month   = sheet_params['month']
        date     = sheet_params['date']
        sheet_from   = sheet_params['sheet_from']
        sheet_to     = sheet_params['sheet_to']
        user_id      = sheet_params['user_id']

        auth_user = get_current_user()
        makeTimeSheets = MakeTimeSheet(auth_user)

        incoming_id = self.resolve_id(user=auth_user, incoming_id=user_id)

        print(incoming_id)

        if month is not None:
            return makeTimeSheets.retrieve_user_timesheet(user_id=incoming_id, month=month)
        elif date is not None:
            return makeTimeSheets.retrieve_user_timesheet(user_id=incoming_id, date=date)
        elif sheet_from is not None and sheet_to is not None:
            return makeTimeSheets.retrieve_user_timesheet(user_id=incoming_id, start_date=sheet_from, end_date=sheet_to)
        else:
            return makeTimeSheets.retrieve_user_timesheet(user_id=incoming_id)
    
    def resolve_id(self, user: User, incoming_id: int) -> int:

        if user.type == 'admin' and user.user_id == incoming_id:
            return user.user_id
        elif user.type == 'admin' and user.user_id != incoming_id:
            return incoming_id
        elif user.type == 'user' and user.user_id == incoming_id:
            return user.user_id
        else:
            return user.user_id

    @jwt_required()
    def delete(self, action):

        sheet_params = delete_sheet_entry_parse.parse_args()

        if sheet_params['id'] is None:
            return {
                "error"     : True,
                "message"   : "Sheet Row could not be deleted"
            }

        auth_user = get_current_user()
        makeTimeSheets = MakeTimeSheet(auth_user)

        return makeTimeSheets.delete_sheet_entry(sheet_params['id'])

    @jwt_required()
    def patch(self, action):
        return {"message": "Hellow World"}