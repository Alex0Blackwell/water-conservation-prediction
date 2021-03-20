from flask import Blueprint, request, jsonify, current_app as app

city_api = Blueprint('city_api', __name__)

@city_api.route("/city")
def boroughList():
    return "list of city"
