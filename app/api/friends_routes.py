from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_, and_

from app.models import User, Friend
from app.forms import friend_form

friends_routes = Blueprint('/friends', __name__)

@friends_routes.route('')
@login_required
def friends_get_friendIds():
  friend = db.session.query(Friend).filter(or_(Friend.user_id == current_user.id, Friend.friend_id == current_user.id))
  return {'friendId': [friendId.to_dict() for friendId in friend]}

@friends_routes.route('/currentUser')
@login_required
def friends_get_currentUserFriend():
  users = db.session.query(User).filter(and_(or_(Friend.user_id == User.id, Friend.friend_id == User.id),or_(current_user.id == Friend.friend_id, current_user.id == Friend.user_id)))
  return {'currentUsersFriend' : [currentUsersFriend.to_dict() for currentUsersFriend in users]}


@friends_routes.route('/<int:userId>')
def friends_get_usrfriend(userId):
  users = db.session.query(User).filter(and_(or_(Friend.user_id == User.id, Friend.friend_id == User.id),or_(userId == Friend.friend_id, userId == Friend.user_id)))
  return {'userFriend' : [userFriend.to_dict() for userFriend in users]}
  


@friends_routes.route('', methods=['POST'])
@login_required
def friends_add_friend():
  data = request.get_json()
  now = datetime.utcnow()
  friend = Friend(user_id=current_user.id, 
                  friend_id=data['userId'], 
                  timeSent=now, 
                  status=data['status'])
  db.session.add(friend)
  db.session.commit()
  return friend.to_dict()


@friends_routes.route('/<int:friendId>', methods=['DELETE'])
@login_required
def friends_delete_friend(friendId):
  try:
    friend = db.session.query(Friend).get(friendId)
    db.session.delete(friend)
    db.session.commit()
  except:
    return 'unsuccessful'
  return 'successful'