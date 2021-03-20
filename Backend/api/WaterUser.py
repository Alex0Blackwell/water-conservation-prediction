from flask import Blueprint

wateruser_api = Blueprint('wateruser_api', __name__)

@wateruser_api.route("/wateruser")
def boroughList():
    return "list of wateruser"
