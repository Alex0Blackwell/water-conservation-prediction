from flask import Blueprint

futurecity_api = Blueprint('futurecity_api', __name__)

@futurecity_api.route("/futurecity")
def boroughList():
    return "list of futurecity"
