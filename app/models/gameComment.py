from .db import db 


class GameComment(db.Model):
  __tablename__ = 'gameComments'


  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.Text)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)


  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'game_id': self.game_id,
      'body': self.body
    }