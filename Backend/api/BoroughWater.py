from flask import Blueprint

boroughwater_api = Blueprint('boroughwater_api', __name__)

@boroughwater_api.route("/boroughwater")
def boroughList():
    return "list of boroughwater"
