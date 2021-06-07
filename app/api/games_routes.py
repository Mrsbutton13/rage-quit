from flask import Blueprint, request
from app.models.db import db
from flask_login import current_user, login_required
from sqlalchemy import desc, or_

from app.models import Game, User


games_routes = Blueprint('/games', __name__)

@games_routes.route("/")
def games_get_all():
  games = Game.query.all()
  return {'game': [game.to_dict() for game in games]}