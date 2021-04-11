from flask import Blueprint,Flask, current_app, jsonify, request
from connection import Database
from dateutil.parser import parse
from datetime import datetime

admin_api = Blueprint('admin_api', __name__)

@admin_api.route("/admin/join", methods=['GET'])
def join():
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