from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

borough_api = Blueprint('borough_api', __name__)

@borough_api.route("/borough/", methods=['GET'])
def index():
    return "entry point for borough data"

@borough_api.route("/borough/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.Borough;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)
