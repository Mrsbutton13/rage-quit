from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_

from app.models import Game, Category, Post, PostComment, User, Friend, GameComment, Platform, UserGame
from app.forms import post_form, game_form, friend_form, add_form

api_routes = Blueprint('/api', __name__)





@api_routes.route('/platforms')
def api_get_platform():
  platforms = Platform.query.all()
  return {'platform': [platform.to_dict() for platform in platforms]}


@api_routes.route('/userGames')
def api_get_game():
  userGames = UserGame.query.all()
  return {'userGame': [userGame.to_dict() for userGame in userGames]}


@api_routes.route('/userGames', methods=['POST'])
@login_required
def api_add_game():
  data = request.get_json()
  userGame = UserGame(user_id=current_user.id, 
                      game_id=data['gameId'])
  db.session.add(userGame)
  db.session.commit()
  return userGame.to_dict()


@api_routes.route('/userGames/<int:userGameId>', methods=['DELETE'])
@login_required
def api_delete_userGame(userGameId):
  try:
    userGame = db.session.query(UserGame).get(userGameId)
    db.session.delete(userGame)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'