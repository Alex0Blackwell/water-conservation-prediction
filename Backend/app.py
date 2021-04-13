from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from mysql.connector import connect
from connection import Database
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
app.register_blueprint(borough_api, url_prefix='/api')
app.register_blueprint(boroughwater_api, url_prefix='/api')
app.register_blueprint(city_api, url_prefix='/api')
app.register_blueprint(citywater_api, url_prefix='/api')
app.register_blueprint(futureborough_api, url_prefix='/api')
app.register_blueprint(futurecity_api, url_prefix='/api')
app.register_blueprint(userwater_api, url_prefix='/api')
app.register_blueprint(wateruser_api, url_prefix='/api')
app.register_blueprint(admin_api, url_prefix='/api')


def get_db():
  db = Database(
    app.config['DB_USERNAME'], 
    app.config['DB_PASSWORD'],
    app.config['DB_HOST'],
    app.config['DB_SCHEMA'])
  return db

@app.route("/")
def index():
  return render_template('index.html')

@app.route("/", methods=['POST'])
def index_post():
  app.config['DB_USERNAME'] = request.form['username']
  app.config['DB_PASSWORD'] = request.form['password']
  app.config['DB_HOST'] = request.form['host_name']
  app.config['DB_SCHEMA'] = request.form['db_name']

  return render_template('index.html', variable=get_db().get_response_text())

@app.errorhandler(404)
def page_not_found(e):
  return "<h1>404</h1><p>The resource could not be found.</p>", 404
    
if __name__ == "__main__":
  app.run()