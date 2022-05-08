from flask import Flask
from cryptography.fernet import Fernet

app = Flask(__name__)

@app.route("/")
def get_response():
    return "Response"
