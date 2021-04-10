from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

citywater_api = Blueprint('citywater_api', __name__)

@citywater_api.route("/citywater", methods=['GET'])
def boroughList():

    # Provide arguments intervalStart & intervalEnd, or 400/500 will be returned
    # Format is /citywater?intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.CityWater WHERE StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@citywater_api.route("/citywater/stats", methods=['GET'])
def cityStats():

    # Provide arguments intervalStart & intervalEnd, or 400/500 will be returned
    # Format is /citywater?intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # Returns [avg(consumption), max(consumption), min(consumption), avg(charges), max(charges), min(charges)]
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT CAST(AVG(Consumption) AS float), MAX(Consumption), MIN(Consumption)," 
                "CAST(AVG(Charges) AS float), MAX(Charges), MIN(Charges)" 
                "FROM jakk.CityWater WHERE StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@citywater_api.route("/citywater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.CityWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)