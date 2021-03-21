from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

citywater_api = Blueprint('citywater_api', __name__)

@citywater_api.route("/citywater")
def boroughList():
    return "entry point for citywater"

@citywater_api.route("/citywater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.CityWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)