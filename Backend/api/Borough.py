from flask import Flask
from flask import Blueprint
from connection import DbConnection

borough_api = Blueprint('borough_api', __name__)


@borough_api.route("/borough/", methods=['GET'])
def index():
    return "entry point for borough data"

@borough_api.route("/borough/all", methods=['GET'])
def all():
    return "entry point for borough data"

# @borough_api.route("/borough/all/", methods=['GET'])
# def all():
#     return Borough.query.all()