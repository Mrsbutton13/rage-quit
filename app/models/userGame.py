from .db import db 


class UserGame(db.Model):
  __tablename__ = 'userGames'


  id = db.Column(db.Integer, primary_key=True)
  game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


  def to_dict(self):
    return {
      'id': self.id,
      'game_id': self.game_id,
      'user_id': self.user_id
    }