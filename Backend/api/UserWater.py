from flask import Blueprint

userwater_api = Blueprint('userwater_api', __name__)

@userwater_api.route("/userwater")
def boroughList():
    return "list of userwater"
