from .db import db 


class GamePlatform(db.Model):
  __tablename__ = 'gamePlatforms'


  id = db.Column(db.Integer, primary_key=True)
  game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
  platform_id = db.Column(db.Integer, db.ForeignKey('platforms.id'), nullable=False)


  def to_dict(self):
    return {
      'id': self.id,
      'game_id': self.game_id,
      'platform_id': self.platform_id
    }