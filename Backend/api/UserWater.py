from flask import Blueprint, request, jsonify, current_app as app

userwater_api = Blueprint('userwater_api', __name__)

@userwater_api.route("/userwater")
def boroughList():
    return "list of userwater"
