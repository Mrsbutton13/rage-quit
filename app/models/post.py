from .db import db 
from sqlalchemy.sql import func

class Post(db.Model):
  __tablename__ = 'posts'


  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.Text)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_on = db.Column(db.DateTime, server_default=func.now())

  comments = db.relationship('PostComment')


  def to_dict(self):
    return {
    'id': self.id,
    'body': self.body,
    'user_id': self.user_id,
    'created_on': self.created_on,
    'comments': [comment.id for comment in self.comments]
    }
