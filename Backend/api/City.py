from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

city_api = Blueprint('city_api', __name__)

@city_api.route("/city")
def boroughList():
    return "entry point for city"

@city_api.route("/city/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.City;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)