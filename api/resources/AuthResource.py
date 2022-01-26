from datetime import date
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_current_user

from models import User

from library.auth.authenticator import Authentication

login_parse = reqparse.RequestParser()

login_parse.add_argument('email', type=str, required=True, help="Missing an Email Field")
login_parse.add_argument('password', type=str, required=True, help="Missing a Password Field")


register_parse = reqparse.RequestParser()

register_parse.add_argument('name', type=str, required=True, help="Missing a Name Field")
register_parse.add_argument('surname', type=str, required=True, help="Missing a Surname Field")
register_parse.add_argument('username', type=str, required=True, help="Missing a Username Field")
register_parse.add_argument('email', type=str, required=True, help="Missing an Email Field")
# register_parse.add_argument('password', type=str, required=True, help="Missing a Password Field")
register_parse.add_argument('type', type=str, required=True, help="Missing a Type Field")

class LoginResource(Resource):
    
    
    def post(self) -> dict:

        data = login_parse.parse_args()

        return Authentication.login(email=data['email'],
                                    password=data['password'])


class RegisterResource(Resource):

    def post(self) -> dict:

        data = register_parse.parse_args()

        password: str = data['username']

        return Authentication.register(name=data['name'],
                                       surname=data['surname'],
                                       email=data['email'],
                                       username=data['username'],
                                       password=password,
                                       type=data['type'])

class AuthUserResource(Resource):

    @jwt_required()
    def post(self) -> dict:

        user: User = get_current_user()
        if user is None:
            return {
                "error": False,
                "message": "Unauthenticated",
                "user": None
            }
        
        return {
            "error": False,
            "message": "Authenticated",
            "user": user.json()
        }
