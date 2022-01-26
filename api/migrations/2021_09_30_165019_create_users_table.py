from orator.migrations import Migration


class CreateUsersTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('users') as table:
            table.string('name')
            table.string('surname')
            table.string('username')
            table.string('email').unique()
            table.timestamps()
            table.string('type')
            table.string('password')
            table.increments('user_id')

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('users')
