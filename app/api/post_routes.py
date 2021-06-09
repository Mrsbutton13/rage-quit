from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_

from app.models import Post, PostComment
from app.forms import post_form

post_routes = Blueprint('/posts', __name__)

@post_routes.route("")
def post_posts_all():
  posts = Post.query.all()
  return {'post': [post.to_dict() for post in posts]}


@post_routes.route('/<int:userId>')
def post_get_users(userId):
  usersPosts = db.session.query(Post).filter(Post.user_id == userId)
  return {'userPost': [userPost.to_dict() for userPost in usersPosts]}


@post_routes.route("", methods=['POST'])
@login_required
def post_create_post():
  data = request.get_json()
  now = datetime.utcnow()
  post = Post(user_id=current_user.id, 
              body=data['body'],
              created_on=now)
  db.session.add(post)
  db.session.commit()
  return post.to_dict()


@post_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def post_delete_post(postId):
  try:
    post = db.session.query(Post).get(postId)
    db.session.delete(post)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'


@post_routes.route('/postComment')
def post_get_pComment():
  postComments = PostComment.query.all()
  return{'postComment': [postComment.to_dict() for postComment in postComments]}


@post_routes.route('/postComment', methods=['POST'])
@login_required
def post_create_pComment():
  data = request.get_json()
  postComment = PostComment(user_id=current_user.id,
                        post_id=data['postId'],
                        body=data['body'])
  db.session.add(postComment)
  db.session.commit()
  return postComment.to_dict()



@post_routes.route('/postComments/<int:postCommentId>', methods=['DELETE'])
@login_required
def post_delete_postComment(postCommentId):
  try:
    postComment = db.session.query(PostComment).get(postCommentId)
    db.session.delete(postComment)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'