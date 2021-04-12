from flask import Flask, current_app
import mysql.connector
from mysql.connector import (connection)
from mysql.connector import errorcode

class Database:
    def __init__(self, user, password, host, database, user_type):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.user_type = user_type
        self.response_text = "Connection not yet established."

        #create connection
        connection = ""
        try:
            connection = mysql.connector.connect(user=user,
                                            password=password,
                                            host=host,
                                            database=database)
            if self.user_type == 'default':
                self.response_text = "Successfully connected to default user"
            if self.user_type == 'admin':
                self.response_text = "Successfully connected to admin user"
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                self.response_text =  "Something is wrong with your user name or password"
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                self.response_text = "Database does not exist"
            else:
                self.response_text = err
        self.connection = connection

    @classmethod
    def fromconfig(cls):
        return cls(
                current_app.config['DB_USERNAME'], 
                current_app.config['DB_PASSWORD'],
                current_app.config['DB_HOST'],
                current_app.config['DB_SCHEMA'],
                current_app.config['DB_USERTYPE'])

    def get_response_text(self):
        return self.response_text
