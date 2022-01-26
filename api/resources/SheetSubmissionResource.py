from typing import Type
from flask_restful import Resource, reqparse
from flask_jwt_extended import get_current_user, jwt_required
from library import ADMIN, ADMIN_ONLY_ERROR

from library import ProcessSheets

sheet_submission_parse: Type[reqparse.RequestParser] = reqparse.RequestParser()

sheet_submission_parse.add_argument('comment', type=str, required=True, help="Missing a Comment field")



class SheetSubmissionResource(Resource):

    @jwt_required()
    def get(self, name) -> dict:

        auth_user = get_current_user()
        admin_process_sheet = ProcessSheets()

        if auth_user.type != ADMIN:
            return ADMIN_ONLY_ERROR

        return admin_process_sheet.view_submission_sheets()

    @jwt_required()
    def post(self, name) -> dict:

        auth_user = get_current_user()
        admin_process_sheet = ProcessSheets()

        sheet_submission_params = sheet_submission_parse.parse_args()

        if sheet_submission_params['comment'] == '' or sheet_submission_params['comment'] is None:
            return {
                "error"     : True,
                "Message"   : "Please leave a comment for the Admin"
            }

        return admin_process_sheet.insert_submission_sheet(user_id=auth_user.user_id, comment=sheet_submission_params['comment'])            