from datetime import date, time, datetime, timedelta
from typing import Type

class DateTimeValidator:
    """
    All datetime & time related logic will be defined & implemented here,
    from validations to time & date calculations
    """

    def __init__(self):
        
        '''
            Days in a week
        '''
        self.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        '''
            current time & date
        '''
        self.datetime_now = datetime.now()
        self.today = date.today()

    def current_time(self) -> str:
        """
        Get current time

        Returns:
            str: time in hour:minute format
        """
        return datetime.time(self.datetime_now).strftime("%H:%M")

    def get_day(self, index=None) -> str:
        
        """
        Get full day, either supply index or get current day

        Returns:
            [type]: Full name of a weekday
        """

        if index is None:

            '''
                Returns current day if no index is supplied
            '''
            return self.days[self.today.weekday()]
        return self.days[index]

    def get_date(self) -> str:
        """
        Get current date, today's date

        Returns:
            str: today's date
        """
        return self.datetime_now.strftime("%d/%m/%Y")

    def get_month(self) -> str:
        """
        Get current Month

        Returns:
            str: today's month
        """
        return self.datetime_now.strftime("%B")

    def get_year(self) -> str:
        """
        Get current year

        Returns:
            str: current year
        """
        return self.datetime_now.strftime("%Y")

    def time_sum(self, time_list: list) -> timedelta:
        sum = timedelta(hours=0, minutes=0)
        for time in time_list:
            sum = sum + time

        return sum

    def remove_trailing_time_zeros(self, time: str) -> str:

        return time.replace(':00', '', 1)

    def time_difference(self, start_time: str, end_time: str) -> tuple:
        """
        Validate the time entered & get time difference between two times

        Args:
            start_time (str): start time
            end_time (str): end time

        Returns:
            tuple: Returns two values,
            1st -> Boolean, True if end time is greater than start time(means the time is valid)
            2nd -> Diffence in time between end time & start time
        """

        '''
            Convert the time string into valid date time objects
        '''
        main_start_time = self.make_time(start_time)
        main_end_time = self.make_time(end_time)

        '''
            Returns two values,
            1st -> Boolean, True if end time is greater than start time(means the time is valid)
            2nd -> Diffence in time between end time & start time
        '''
        return main_end_time > main_start_time, main_end_time - main_start_time

    def make_time(self, time: str):
        """
        Convert time strings into valid time objects

        Args:
            time (str): time e.g "18:45"

        Returns:
            deltatime: datetime object 
        """

        '''
            splice the time string into separate components, hour & minute
        '''
        hour, min = self.splice_time(time)

        '''
            convert the time, takes in hour & minute
        '''
        return timedelta(hours=int(hour), minutes=int(min))

    def splice_time(self, time: str) -> tuple:
        """
        Split the time string into separate components, hour & minute

        Args:
            time (str): time string

        Returns:
            tuple: hour & minute
        """
        return tuple(time.split(':'))

    def splice_date(self, _date: str)-> tuple:
        return tuple(_date.split('/'))

    def make_date(self, _date: str) -> Type[datetime]:
        day, month, year = self.splice_date(_date)
        return datetime(year, month, day)

    def valid_date_range(self,start_date: str, end_date: str):
        main_start_date = self.make_date(start_date)
        main_end_date = self.make_date(end_date)
        return main_end_date > main_start_date

    def is_time_ok(self, time: str) -> bool:
        time = tuple(time.split(":"))

        if time.count() != 2:
            return False
        
        hour, min = time

        if int(hour) < 00 or int(hour) > 23:
            return False

        if int(min) < 00 or int(min) > 59:
            return False
        
        return True
        
    def is_date_ok(self, date: str) -> bool:
        pass

