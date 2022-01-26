# Excelator RESTFul API

## Database Migrations

To Create a Migration File
```
(api_venv)$ python db.py make:migration <name_of_migration> -p /migrations --table=table_name --creare
```

To Run Migrations
```
(api_venv)$ python db.py migrate 
```

To Rollback on a Migration
```
(api_venv)$ python db.py migrate:rollback
```
For Additional Info, Refer to the following Orator Docs <br />
[Orator ORM](https://orator-orm.com/docs/0.9/orm.html) <br />
[Orator Migrations](https://orator-orm.com/docs/0.9/migrations.html) <br />
[Orator with Flask (important)](https://flask-orator.readthedocs.io/en/latest/basic_usage.html) <br />
[Orator Schema Builder](https://orator-orm.com/docs/0.9/schema_builder.html) <br />

