from flask import Blueprint, request, jsonify, current_app as app
# from flask_sqlalchemy import SQLAlchemy
# #sets db connection instance
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://flask_app:jakkborealis354@cmpt354-jakk.cfchtqoqn7bd.us-west-2.rds.amazonaws.com'
# dbconnection = SQLAlchemy(app)

boroughwater_api = Blueprint('boroughwater_api', __name__)

@boroughwater_api.route("/boroughwater")
def boroughList():
    return "list of boroughwater"
