from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

admin_api = Blueprint('admin_api', __name__)

@admin_api.route("/admin/join", methods=['GET'])
def join():
    # Format is /admin/join?borough1=XXXX&borough2=XXXX
    # Returns borough1 and borough2 alongside their consumptions based on the same month respectively
    borough1 = request.args['borough1']
    borough2 = request.args['borough2']
    
    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT b1.startDate, b1.borough, b1.consumption, b2.borough, b2.consumption " 
                "FROM BoroughWater b1 "
                "INNER JOIN BoroughWater b2 ON b1.startDate = b2.startDate "
                "WHERE b1.borough = %s AND b2.borough = %s")

    cursor.execute(query, (borough1, borough2))
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@admin_api.route("/admin/groupby", methods=['GET'])
def aggregationGroupBy():
    # Format is admin/groupby?largerthan=XXXX
    # Returns boroughs and their sum(consumption) larger than XXXX
    largerThan = int(request.args['largerthan'])

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("SELECT borough, CAST(sum(consumption) AS float) FROM jakk.BoroughWater " 
                "Group by borough having sum(consumption) > %s")
                # "Group by borough having sum(consumption) > 1000000")

    cursor.execute(query, (largerThan,))
    # cursor.execute(query)
    result = cursor.fetchall()

    db.connection.close()
    return jsonify(result)

@admin_api.route("/admin/deletecity", methods=['GET'])
def kingkong():
    # Format is admin/deletecity?city=XXXX
    city = request.args['city']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("DELETE FROM jakk.City WHERE City = %s")

    cursor.execute(query, (city,))
    print(cursor.statement)
    db.connection.commit()

    db.connection.close()
    return jsonify(["Number of rows affected", cursor.rowcount])

@admin_api.route("/admin/updateborough", methods=['GET'])
def updateBorough():
    # Format is admin/updateborough?target=XXXX&result=XXXX
    target = request.args['target']
    result = request.args['result']

    db = Database.fromconfig()
    cursor = db.connection.cursor()
    query = ("UPDATE jakk.Borough SET Borough = %s WHERE Borough = %s")

    cursor.execute(query, (result, target))
    db.connection.commit()

    db.connection.close()
    return jsonify(["Number of rows affected", cursor.rowcount])

