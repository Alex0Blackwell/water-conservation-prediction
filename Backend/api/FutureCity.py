from flask import Blueprint,Flask, current_app, jsonify
from connection import Database

futurecity_api = Blueprint('futurecity_api', __name__)

@futurecity_api.route("/futurecity")
def boroughList():
    return "entry point for futurecity"

@futurecity_api.route("/futurecity/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureCity;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)