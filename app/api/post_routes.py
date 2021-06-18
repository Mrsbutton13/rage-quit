from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_, and_
from app.awsUpload import *

from app.models import Post, PostComment, Friend, User
from app.forms import PostForm

post_routes = Blueprint('/posts', __name__)

@post_routes.route("")
@login_required
def get_currentUser_and_friends_posts():
  posts = db.session.query(Post).filter(or_(Post.user_id == Friend.user_id, Post.user_id == Friend.friend_id, Post.user_id == current_user.id))
  return {'post': [post.to_dict() for post in posts]}


@post_routes.route('/<int:userId>')
def post_get_users(userId):
  usersPosts = db.session.query(Post).filter(Post.user_id == userId)
  return {'userPost': [userPost.to_dict() for userPost in usersPosts]}


@post_routes.route("", methods=['POST'])
@login_required
def post_create_post():
  form = PostForm()
  now = datetime.utcnow()
  post_image = None
  if 'post_img' not in request.files:
    upload = None
  else:
    post_image = request.files['post_img']

  if post_image and allowed_file(post_image.filename):
    post_image.filename = get_unique_filename(post_image.filename)
    upload = upload_file_to_s3(post_image)
    if upload['url']:
      upload = upload['url']

  post = Post(
      user_id = current_user.id,
      body=form.data['body'],
      post_img=upload,
      post_video=form.data['post_video'],
      created_on=now
  )
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



@post_routes.route('/postComments/<int:postId>', methods=['DELETE'])
@login_required
def post_delete_postComment(postId):
  try:
    postComment = db.session.query(PostComment).get(postId)
    db.session.delete(postComment)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'