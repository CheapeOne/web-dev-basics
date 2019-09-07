from flask import Flask, request, jsonify
from flask_cors import CORS

from database import CirclesDB

app = Flask(__name__)
CORS(app)

# create global instance of circle database since im lazy
circles_db = CirclesDB()


@app.route('/')
def hello_world():
    return 'Hello, welcome to my dumb server!'


@app.route('/circles', methods=['GET'])
def get_circles():
    circles = circles_db.all()
    return jsonify(circles)


@app.route('/circles', methods=['POST'])
def add_circle():
    circle_data = request.get_json()
    print(circle_data)
    new_circle = circles_db.add(circle_data)
    return jsonify(new_circle)


@app.route('/circles/<id>', methods=['DELETE'])
def remove_circle(id):
    circle_id = int(id)
    successful = circles_db.remove(circle_id)
    return jsonify(success=successful)
