from flask import Blueprint,Flask, current_app, jsonify, request
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
            authorized = True

    db.connection.close()
    return jsonify(authorized)
