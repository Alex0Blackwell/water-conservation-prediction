from flask import Blueprint, request, jsonify, current_app as app

futureborough_api = Blueprint('futureborough_api', __name__)

@futureborough_api.route("/futureborough")
def boroughList():
    return "list of futureborough"
