from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_, and_

from app.models import Game, Category, GameComment, UserGame

games_routes = Blueprint('/games', __name__)


@games_routes.route("")
def games_get_all():
  games = Game.query.all()
  return {'game': [game.to_dict() for game in games]}


@games_routes.route("/categories")
def games_categories_all():
  categories = Category.query.all()
  return {'category': [category.to_dict() for category in categories]}


@games_routes.route('/comments')
def games_get_comments():
  comments = GameComment.query.all()
  return {'comment': [comment.to_dict() for comment in comments]}


@games_routes.route('/comments/<int:commentId>', methods=['DELETE'])
@login_required
def games_delete_comment(commentId):
  try:
    comment = db.session.query(GameComment).get(commentId)
    db.session.delete(comment)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'


@games_routes.route('/comments', methods=['POST'])
@login_required
def games_create_comment():
  data = request.get_json()
  comment = GameComment(user_id=current_user.id,
                        game_id=data['gameId'],
                        body=data['body'])
  db.session.add(comment)
  db.session.commit()
  return comment.to_dict()

@games_routes.route('/userGames/<int:userId>')
def games_get_userGameId(userId):
  userGameId = db.session.query(UserGame).filter(UserGame.user_id == userId)
  return {'joinsIds': [joinsIds.to_dict() for joinsIds in userGameId]}
  

@games_routes.route('/currentUserGames')
@login_required
def games_get_currentUsersGame():
  userGames = db.session.query(Game).filter(and_(UserGame.game_id == Game.id, current_user.id == UserGame.user_id))
  return {'currentUserGame': [currentUserGame.to_dict() for currentUserGame in userGames]}


@games_routes.route('/<int:userId>')
def games_get_usersGame(userId):
  otherUserGames = db.session.query(Game).filter(and_(UserGame.game_id == Game.id, userId == UserGame.user_id))
  return {'otherUserGame': [otherUserGame.to_dict() for otherUserGame in otherUserGames]}


@games_routes.route('/userGames', methods=['POST'])
@login_required
def games_add_game():
  data = request.get_json()
  userGame = UserGame(user_id=current_user.id, 
                      game_id=data['gameId'])
  db.session.add(userGame)
  db.session.commit()
  return userGame.to_dict()


@games_routes.route('/userGames/<int:userGameId>', methods=['DELETE'])
@login_required
def games_delete_userGame(userGameId):
  try:
    userGame = db.session.query(UserGame).get(userGameId)
    db.session.delete(userGame)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'