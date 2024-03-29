from .db import db 
from sqlalchemy.sql import func 

class Friend(db.Model):
  __tablename__ = 'friends'


  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  timeSent = db.Column(db.DateTime, server_default=func.now())
  status = db.Column(db.String(50))

  
  
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'friend_id': self.friend_id,
      'timeSent' : self.timeSent,
      'status': self.status
    }

  