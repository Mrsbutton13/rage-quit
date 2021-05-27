from .db import db 


class UserPlatform(db.Model):
  __tablename__ = 'userPlatforms'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  platforms_id = db.Column(db.Integer, db.ForeignKey('platforms.id'), nullable=False)


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'platforms_id': self.platforms_id
    }