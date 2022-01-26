from typing import Type
from flask_restful import Resource, reqparse
from flask_jwt_extended import get_current_user, jwt_required

from library import SearchUsers


search: Type[reqparse.RequestParser] = reqparse.RequestParser()

search.add_argument('q', type=str, required=True, help="Missing a Search Query")

class SearchResource(Resource):

    @jwt_required()
    def get(self):

        search_data = search.parse_args()

        q: str = search_data['q']

        return SearchUsers.find_user(q=q)