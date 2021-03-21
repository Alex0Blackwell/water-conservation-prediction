from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

boroughwater_api = Blueprint('boroughwater_api', __name__)

@boroughwater_api.route("/boroughwater")
def boroughList():
    return "entry point for boroughwater"

@boroughwater_api.route("/boroughwater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.BoroughWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)