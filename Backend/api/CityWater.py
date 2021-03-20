from flask import Blueprint, request, jsonify, current_app as app

citywater_api = Blueprint('citywater_api', __name__)

@citywater_api.route("/citywater")
def boroughList():
    return "list of citywater"
