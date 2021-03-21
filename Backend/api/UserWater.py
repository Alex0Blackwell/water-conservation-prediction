from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

userwater_api = Blueprint('userwater_api', __name__)

@userwater_api.route("/userwater")
def boroughList():
    return "entry point for userwater"

@userwater_api.route("/userwater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.UserWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)
