from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_

from app.models import User, Friend
from app.forms import friend_form

friends_routes = Blueprint('/friends', __name__)

@friends_routes.route('/')
@login_required
def friends_get_currentUserFriend():
  friends = db.session.query(Friend).filter(or_(Friend.user_id == current_user.id, Friend.friend_id == current_user.id))
  return {'friend' : [friend.to_dict() for friend in friends]}


@friends_routes.route('/<int:userId>')
def friends_get_usrfriend(userId):
  usersFriends = db.session.query(Friend).filter(or_(Friend.user_id == userId, Friend.friend_id == userId))
  return {'userFriend' : [userFriend.to_dict() for userFriend in usersFriends]}
  


@friends_routes.route('/', methods=['POST'])
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