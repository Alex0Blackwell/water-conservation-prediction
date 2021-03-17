from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return "New York water! HAH!"

if __name__ == "__main__":
  app.run()