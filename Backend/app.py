from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api.Borough import borough_api
from api.BoroughWater import boroughwater_api
from api.City import city_api
from api.CityWater import citywater_api
from api.FutureBorough import futureborough_api
from api.FutureCity import futurecity_api
from api.UserWater import userwater_api
from api.WaterUser import wateruser_api

app = Flask(__name__)

#sets db connectoin instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://flask_app:jakkborealis354@cmpt354-jakk.cfchtqoqn7bd.us-west-2.rds.amazonaws.com'
dbconnection = SQLAlchemy(app)

#registers APIs
app.register_blueprint(borough_api, url_prefix='/api')
app.register_blueprint(boroughwater_api, url_prefix='/api')
app.register_blueprint(city_api, url_prefix='/api')
app.register_blueprint(citywater_api, url_prefix='/api')
app.register_blueprint(futureborough_api, url_prefix='/api')
app.register_blueprint(futurecity_api, url_prefix='/api')
app.register_blueprint(userwater_api, url_prefix='/api')
app.register_blueprint(wateruser_api, url_prefix='/api')

@app.route("/")
def hello():
  return '''<h1>Water Conservation Prediction API</h1>'''

if __name__ == "__main__":
  app.run()