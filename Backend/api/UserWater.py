from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

userwater_api = Blueprint('userwater_api', __name__)

@userwater_api.route("/userwater", methods=['GET'])
def boroughList():
    # Format is /userwater?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.UserWater WHERE User = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@userwater_api.route("/userwater/stats", methods=['GET'])
def boroughListStats():
    # Format is /userwater?name=XXXX&intervalStart=YYYY-MM-DD&intervalEnd=YYYY-MM-DD
    # All arguments are mandatory
    name = request.args['name']
    intervalStart = request.args['intervalStart']
    intervalEnd = request.args['intervalEnd']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT CAST(AVG(Consumption) AS float), MAX(Consumption), MIN(Consumption)," 
                "CAST(AVG(Charges) AS float), MAX(Charges), MIN(Charges)"
                "FROM jakk.UserWater WHERE User = %s AND StartDate BETWEEN %s AND %s")

    start = datetime.strptime(intervalStart, '%Y-%m-%d')
    end = datetime.strptime(intervalEnd, '%Y-%m-%d')

    cursor.execute(query, (name, start, end))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@userwater_api.route("/userwater/all", methods=['GET'])
def all():
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT * FROM jakk.UserWater;")
    cursor.execute(query)
    result = cursor.fetchall()

    return jsonify(result)
