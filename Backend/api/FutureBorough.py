from flask import Blueprint

futureborough_api = Blueprint('futureborough_api', __name__)

@futureborough_api.route("/futureborough")
def boroughList():
    return "list of futureborough"
