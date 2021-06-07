from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_

from app.models import Game, Category, Post, PostComment, User, GameComment, Platform, UserGame
from app.forms import post_form, game_form, friend_form, add_form

api_routes = Blueprint('/api', __name__)
  

@api_routes.route("/categories")
def api_categories_all():
  categories = Category.query.all()
  return {'category': [category.to_dict() for category in categories]}


@api_routes.route("/posts")
def api_posts_all():
  posts = Post.query.all()
  return {'post': [post.to_dict() for post in posts]}

@api_routes.route('/posts/<int:userId>')
def api_posts_users(userId):
  userPosts = db.session.query(Post).filter(or_(Post.user_id == userId))
  return {"userPosts": [userPost.to_dict() for userPost in userPosts]}


@api_routes.route("/posts", methods=['POST'])
@login_required
def api_create_post():
  data = request.get_json()
  now = datetime.utcnow()
  post = Post(user_id=current_user.id, 
              body=data['body'],
              created_on=now)
  db.session.add(post)
  db.session.commit()
  return post.to_dict()


@api_routes.route('/posts/<int:postId>', methods=['DELETE'])
@login_required
def api_delete_post(postId):
  try:
    post = db.session.query(Post).get(postId)
    db.session.delete(post)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'




@api_routes.route('/comments', methods=['POST'])
@login_required
def api_create_comment():
  data = request.get_json()
  comment = GameComment(user_id=current_user.id,
                        game_id=data['gameId'],
                        body=data['body'])
  db.session.add(comment)
  db.session.commit()
  return comment.to_dict()


@api_routes.route('/comments/<int:commentId>', methods=['DELETE'])
@login_required
def api_delete_comment(commentId):
  try:
    comment = db.session.query(GameComment).get(commentId)
    db.session.delete(comment)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'


@api_routes.route('/postComment')
def api_get_pComment():
  postComments = PostComment.query.all()
  return{'postComment': [postComment.to_dict() for postComment in postComments]}


@api_routes.route('/postComment', methods=['POST'])
@login_required
def api_create_pComment():
  data = request.get_json()
  postComment = PostComment(user_id=current_user.id,
                        post_id=data['postId'],
                        body=data['body'])
  db.session.add(postComment)
  db.session.commit()
  return postComment.to_dict()



@api_routes.route('/postComments/<int:postCommentId>', methods=['DELETE'])
@login_required
def api_delete_postComment(postCommentId):
  try:
    postComment = db.session.query(PostComment).get(postCommentId)
    db.session.delete(postComment)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'

@api_routes.route('/comments')
def api_get_comments():
  comments = GameComment.query.all()
  return {'comment': [comment.to_dict() for comment in comments]}


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