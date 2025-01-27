from flask import Flask, request, render_template
from flask.helpers import url_for
from flask_cors import CORS, cross_origin
from mysql.connector import connect
from connection import Database
from api.Authentication import auth_api
from api.Borough import borough_api
from api.BoroughWater import boroughwater_api
from api.City import city_api
from api.CityWater import citywater_api
from api.FutureBorough import futureborough_api
from api.FutureCity import futurecity_api
from api.UserWater import userwater_api
from api.WaterUser import wateruser_api
from api.Admin import admin_api


app = Flask(__name__)
CORS(app)

# registers api routing
app.register_blueprint(auth_api, url_prefix='/api')
app.register_blueprint(borough_api, url_prefix='/api')
app.register_blueprint(boroughwater_api, url_prefix='/api')
app.register_blueprint(city_api, url_prefix='/api')
app.register_blueprint(citywater_api, url_prefix='/api')
app.register_blueprint(futureborough_api, url_prefix='/api')
app.register_blueprint(futurecity_api, url_prefix='/api')
app.register_blueprint(userwater_api, url_prefix='/api')
app.register_blueprint(wateruser_api, url_prefix='/api')
app.register_blueprint(admin_api, url_prefix='/api')

app.config['DB_USERNAME'] = 'account_default'
app.config['DB_PASSWORD'] = 'defaultuser123'
app.config['DB_HOST'] = 'cmpt354-jakk.cfchtqoqn7bd.us-west-2.rds.amazonaws.com'
app.config['DB_SCHEMA'] = 'jakk'
app.config['DB_USERTYPE'] = 'default'

def get_db():
  db = Database(
    app.config['DB_USERNAME'], 
    app.config['DB_PASSWORD'],
    app.config['DB_HOST'],
    app.config['DB_SCHEMA'],
    app.config['DB_USERTYPE'])
  return db

@app.route("/")
def index():
  return render_template('index.html', variable=get_db().get_response_text())

@app.errorhandler(404)
def page_not_found(e):
  return "<h1>404</h1><p>The resource could not be found.</p>", 404
    
if __name__ == "__main__":
  app.run()