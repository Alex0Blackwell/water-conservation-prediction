from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

futurecity_api = Blueprint('futurecity_api', __name__)

@futurecity_api.route("/futurecity", methods=['GET'])
def boroughList():
    
    # Provide arguments intervalStart & intervalEnd, or 400/500 will be returned
    # Format is /futurecity?intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureCity WHERE StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@futurecity_api.route("/futurecity/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureCity;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)