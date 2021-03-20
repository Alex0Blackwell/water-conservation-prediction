import mysql.connector
from mysql.connector import (connection)
from mysql.connector import errorcode

class DbConnection:
    def __init__(self, user, password, host, database):
        self.user = user
        self.password = password
        self.host = host
        self.database = database

    def cursor(self):
        cursor = ""
        try:
            cnx = mysql.connector.connect(user=self.user,
                                            password=self.password,
                                            host=self.host,
                                            database=self.database)
            cursor = cnx.cursor()
            response_text = "Successfully connected"
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                response_text =  "Something is wrong with your user name or password"
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                response_text = "Database does not exist"
            else:
                response_text = err
        return cursor, response_text
