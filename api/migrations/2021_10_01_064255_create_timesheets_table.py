from orator.migrations import Migration


class CreateTimesheetsTable(Migration):

    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create('time_sheets') as table:
            table.integer('user_id', unsigned=True)
            table.increments('time_sheet_id')
            table.text('date')
            table.text('month')
            table.text('day')
            table.text('client')
            table.text('client_project_name')
            table.text('description')
            table.text('bill')
            table.text('comment')
            table.text('total_time')
            table.text('start_time')
            table.text('end_time')
            table.timestamps()

            table.foreign('user_id').references('user_id').on('users')

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop('time_sheets')
