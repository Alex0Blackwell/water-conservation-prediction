from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

futureborough_api = Blueprint('futureborough_api', __name__)

@futureborough_api.route("/futureborough", methods=['GET'])
def boroughList():
    # Format is /futureborough?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureBorough WHERE Borough = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@futureborough_api.route("/futureborough/stats", methods=['GET'])
def futureBoroughStats():
    # Format is /futureborough?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    # Returns [avg(consumption), max(consumption), min(consumption), avg(charges), max(charges), min(charges)]
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT CAST(AVG(Consumption) AS float), MAX(Consumption), MIN(Consumption)" 
                "FROM jakk.FutureBorough WHERE Borough = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@futureborough_api.route("/futureborough/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.FutureBorough;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)