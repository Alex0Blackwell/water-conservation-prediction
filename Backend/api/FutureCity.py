from flask import Blueprint, request, jsonify, current_app as app

futurecity_api = Blueprint('futurecity_api', __name__)

@futurecity_api.route("/futurecity")
def boroughList():
    return "list of futurecity"
