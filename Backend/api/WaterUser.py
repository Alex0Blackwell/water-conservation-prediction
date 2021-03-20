from flask import Blueprint, request, jsonify, current_app as app

wateruser_api = Blueprint('wateruser_api', __name__)

@wateruser_api.route("/wateruser")
def boroughList():
    return "list of wateruser"
