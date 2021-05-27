from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.Text)
  bio = db.Column(db.Text)
  gamertag = db.Column(db.String(60))

  user = db.relationship('Friend', foreign_keys='[Friend.user_id]')
  friend = db.relationship('Friend', foreign_keys='[Friend.friend_id]')

  userGames = db.relationship('UserGame')
  gameComments = db.relationship('GameComment')

  posts = db.relationship('Post')
  postComments = db.relationship('PostComment')

  userPlatforms = db.relationship('UserPlatform')

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)
    


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'avatar': self.avatar,
      'bio': self.bio,
      'gamertag': self.gamertag,
      'gameComments': [comment.to_dict() for comment in self.gameComments],
      'posts': [post.to_dict() for post in self.posts],
      'postComments': [postComment.to_dict() for postComment in self.postComments]
    }
