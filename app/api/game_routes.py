import requests
import os
from flask import Blueprint, request
from app.models.db import db
from flask_login import current_user, login_required

game_routes = Blueprint('/games', __name__)

API_KEY = os.environ.get('API_KEY')

@game_routes.route('/')
def api_get_games():
  # Make request to gather information from external api
  req = requests.get(f"https://api.rawg.io/api/games?key={API_KEY}").json()
  # Key into api results
  data = req.get('results')
  # Return game in a dict with games in a list
  return {'game': [game for game in data]}


@game_routes.route('/top')
def api_get_top_games():
  req = requests.get(f"https://api.rawg.io/api/games?key={API_KEY}&ordering=-rating").json()
  data = req.get('results')
  return {'topGame': [topGame for topGame in data]}
  

