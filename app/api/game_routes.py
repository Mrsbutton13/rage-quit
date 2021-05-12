import requests
import os
import rawgpy
from flask import Blueprint, request
from app.models.db import db
from flask_login import current_user, login_required

game_routes = Blueprint('/games', __name__)

API_KEY = os.environ.get('API_KEY')

@game_routes.route('/')
def api_get_games():
  req = requests.get(f"https://api.rawg.io/api/games?key={API_KEY}")
  data = req.json()
  return data


