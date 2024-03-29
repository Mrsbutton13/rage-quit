from .db import db 


class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))

  game = db.relationship('Game')


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name
    }