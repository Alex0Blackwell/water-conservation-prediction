from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

wateruser_api = Blueprint('wateruser_api', __name__)

@wateruser_api.route("/wateruser")
def boroughList():
    return "entry point for wateruser"

@wateruser_api.route("/wateruser/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.WaterUser;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)