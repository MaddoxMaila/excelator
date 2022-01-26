
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token)


from models import User

class Authentication:

    @staticmethod
    def get_auth_user(id: int):
        return User.all().where('user_id', id).first()

    @staticmethod
    def login(email: str, password: str) -> dict:
        """
        Try and login a user to the system and generate authentication tokens

        Args:
            email (str): Email of the user
            password (str): Password of the user

        Returns:
            dict: Either Authentication tokens or error messages
        """

        user = User.all().where('email', email).first()

        '''
            Check if the email matched with any user
        '''
        if user is None:
            '''
                No user was found
            '''
            return {"error": True, "message": "User with email -> {} does not exist".format(email)}

        '''
            Compare passwords of the user in the database & the password supplied
        '''
        if user and safe_str_cmp(user.password, password):

            return {
                "error": False,
                "message": "Authentication successful",
                "access_token" : create_access_token(identity=user.user_id, fresh=True),
                "refresh_token" : create_refresh_token(user.user_id),
                "user": user.json()
            }
        
        return { "message" : "Invalid Credentials", "error": True }

    @staticmethod
    def register(name: str, surname: str, email: str, username: str, password: str, type: str) -> dict:
        """[summary]

        Args:
            name (str): Name of the user
            surname (str): Surname of the user
            email (str): Email of the user
            username (str): Preferred username of the user
            password (str): Password of the user

        Returns:
            dict: message to alert if user registration was successful
        """

        '''
            Check if user exists of the same email address,
            should also check for username
        '''
        if User.all().where('email', email).first() is not None:
            
            '''
                Return with error True
            '''
            return {"error": True, "message": "User with this email address already exists"}

        '''
            Create User with the supplied details
        '''
        user = User.create(name=name,
                    surname=surname,
                    username=username,
                    email=email,
                    password=password,
                    type=type)

        '''
            Save the User to the Database
        '''
        user.save()

        '''
            Return a successful message
        '''
        return {
            "error": False,
            "message": "User created successfully",
            "user": user.json() 
        }