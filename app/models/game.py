from .db import db 


class Game(db.Model):
  __tablename__ = 'games'

  id = db.Column(db.Integer, primary_key=True)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  title = db.Column(db.String(50))
  description = db.Column(db.Text)
  img = db.Column(db.String(300))

  gameComments = db.relationship('GameComment')
  gamePlatform = db.relationship('GamePlatform')
  userLiked = db.relationship('UserGame')

  def to_dict(self):
    return {
      'id': self.id,
      'category_id': self.category_id,
      'title': self.title,
      'description' : self.description,
      'img': self.img,
      'gameComments': [gameComment.id for gameComment in self.gameComments],
    }

