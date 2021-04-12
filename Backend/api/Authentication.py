from flask import Blueprint,current_app,Flask, jsonify, request
from connection import Database

auth_api = Blueprint('auth_api', __name__)

@auth_api.route("/auth/login", methods=['POST'])
def login():
    # Format is /auth/login?username=XXXX&password=YYYY
    # All arguments are mandatory
    authorized = False
    username = request.args['username']
    password = request.args['password']
    
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.Account WHERE Username = %(Username)s")
    cursor.execute(query, {'Username': username})
    account = cursor.fetchone()
    if(account):
        if password == account[2]:
            current_app.config['DB_USERNAME'] = username
            current_app.config['DB_PASSWORD'] = password
            current_app.config['DB_USERTYPE'] = 'admin'
            authorized = True

    db.connection.close()
    return jsonify(authorized)

@auth_api.route("/auth/logout", methods=['POST'])
def logout():
    current_app.config['DB_USERNAME'] = 'account_default'
    current_app.config['DB_PASSWORD'] = 'defaultuser123'
    current_app.config['DB_USERTYPE'] = 'default'

