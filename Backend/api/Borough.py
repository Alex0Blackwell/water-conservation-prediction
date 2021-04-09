from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database

borough_api = Blueprint('borough_api', __name__)

@borough_api.route("/borough/", methods=['GET'])
def index():
    # Format is /borough?name=XXXX
    # All arguments are mandatory
    name = request.args['name']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.Borough WHERE borough = %s")
    cursor.execute(query, (name,))

    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)


@borough_api.route("/borough/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.Borough;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)
