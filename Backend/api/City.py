from flask import Blueprint

city_api = Blueprint('city_api', __name__)

@city_api.route("/city")
def boroughList():
    return "list of city"
