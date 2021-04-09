from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

boroughwater_api = Blueprint('boroughwater_api', __name__)

@boroughwater_api.route("/boroughwater", methods=['GET'])
def boroughList():
    # Format is /boroughwater?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.BoroughWater WHERE Borough = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@boroughwater_api.route("/boroughwater/stats", methods=['GET'])
def boroughStats():
    # Format is /boroughwater/stats?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    # Returns [avg(consumption), max(consumption), min(consumption), avg(charges), max(charges), min(charges)]
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT CAST(AVG(Consumption) AS float), MAX(Consumption), MIN(Consumption)," 
                "CAST(AVG(Charges) AS float), MAX(Charges), MIN(Charges)" 
                "FROM jakk.BoroughWater WHERE Borough = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@boroughwater_api.route("/boroughwater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.BoroughWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)