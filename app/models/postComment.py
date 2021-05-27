from .db import db 


class PostComment(db.Model):
  __tablename__ = 'postComments'


  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.Text)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)


  def to_dict(self):
    return {
    'id': self.id,
    'user_id': self.user_id,
    'post_id': self.post_id,
    'body':self.body
    }