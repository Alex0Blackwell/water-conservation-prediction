from flask import Blueprint

borough_api = Blueprint('borough_api', __name__)

@borough_api.route("/borough")
def boroughList():
    return "list of borough"
