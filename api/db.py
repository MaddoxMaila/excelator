from typing import Type
from flask_orator import Orator
from app import app


app.config['ORATOR_DATABASES'] = {
    'dev': {
        'driver': 'sqlite',
        'database': 'excelator.db',
    }
}


db = Orator(app)


if __name__== '__main__':
    db.cli.run()




