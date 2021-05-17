import requests
import os
from flask import Blueprint, request
from app.models.db import db
from flask_login import current_user, login_required

genres_routes = Blueprint('/genres', __name__)

API_KEY = os.environ.get('API_KEY')

@genres_routes.route('/')
def api_get_genres():
  req = requests.get(f"https://api.rawg.io/api/genres?key={API_KEY}").json()
  data = req.get('results')
  return {'genre': [genre for genre in data]}

