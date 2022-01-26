from orator.migrations import Migration


class CreateSheetSubmit(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('sheet_submit') as table:
            table.increments('sheet_submit_id')
            table.integer('user_id', unsigned=True)
            table.string('comment')
            table.string('date_time')
            table.timestamps()

            table.foreign('user_id').references('user_id').on('users')

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('sheet_submit')
