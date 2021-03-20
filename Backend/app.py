from flask import Flask, request, render_template
from connection import DbConnection
from api.Borough import borough_api
from api.BoroughWater import boroughwater_api
from api.City import city_api
from api.CityWater import citywater_api
from api.FutureBorough import futureborough_api
from api.FutureCity import futurecity_api
from api.UserWater import userwater_api
from api.WaterUser import wateruser_api


app = Flask(__name__)

#registers APIs
app.register_blueprint(borough_api, url_prefix='/api')
app.register_blueprint(boroughwater_api, url_prefix='/api')
app.register_blueprint(city_api, url_prefix='/api')
app.register_blueprint(citywater_api, url_prefix='/api')
app.register_blueprint(futureborough_api, url_prefix='/api')
app.register_blueprint(futurecity_api, url_prefix='/api')
app.register_blueprint(userwater_api, url_prefix='/api')
app.register_blueprint(wateruser_api, url_prefix='/api')


def test_connection():
  con = DbConnection(
    app.config['DB_USERNAME'], 
    app.config['DB_PASSWORD'],
    app.config['DB_HOST'],
    app.config['DB_SCHEMA'])
  return con.cursor()

@app.route("/")
def index():
  return render_template('index.html')

@app.route("/", methods=['POST'])
def index_post():
  app.config['DB_USERNAME'] = request.form['username']
  app.config['DB_PASSWORD'] = request.form['password']
  app.config['DB_HOST'] = 'cmpt354-jakk.cfchtqoqn7bd.us-west-2.rds.amazonaws.com'
  app.config['DB_SCHEMA'] = 'jakk'
  return render_template('index.html', variable=test_connection()[1])

@app.errorhandler(404)
def page_not_found(e):
  return "<h1>404</h1><p>The resource could not be found.</p>", 404
    
if __name__ == "__main__":
  app.run()