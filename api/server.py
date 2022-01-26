from app import app

from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from db import *

from routes.routes import register_routes

from models import User

api = Api(app)

CORS(app)

app.config['JWT_SECRET_KEY'] = 'excelator!'

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

jwt = JWTManager(app=app)

@jwt.user_lookup_loader
def get_auth_user(header, data):

    identity = data['sub']
    user = User.all().where('user_id', identity)

    if user is not None:
        return user.first()

    return None
    
'''
	Register routes and resources
'''
register_routes(api=api)

'''
	Run the server
'''
if __name__ == '__main__':
	app.run(port=5000)