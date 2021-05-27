from .db import db 


class Platform(db.Model):
  __tablename__ = 'platforms'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  
  games = db.relationship('GamePlatform')
  user = db.relationship('UserPlatform')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
    }