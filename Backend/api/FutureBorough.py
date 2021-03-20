from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

futureborough_api = Blueprint('futureborough_api', __name__)

@futureborough_api.route("/futureborough")
def boroughList():
    return "entry point for futureborough"

@futureborough_api.route("/futureborough/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureBorough;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)