from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database

wateruser_api = Blueprint('wateruser_api', __name__)

@wateruser_api.route("/wateruser", methods=['GET'])
def boroughList():
    # Format is /wateruser?name=XXXX
    # All arguments are mandatory
    name = request.args['name']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.WaterUser WHERE borough = %s")
    cursor.execute(query, (name,))

    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@wateruser_api.route("/wateruser/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.WaterUser;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)