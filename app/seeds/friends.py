from app.models import db
from app.models import Friend


def seed_friends():
  friend1 = Friend(user_id=1, friend_id=3)
  friend2 = Friend(user_id=1, friend_id=2)
  friend3 = Friend(user_id=1, friend_id=4)
  friend4 = Friend(user_id=1, friend_id=5)
  friend5 = Friend(user_id=2, friend_id=7)
  friend6 = Friend(user_id=2, friend_id=6)
  friend7 = Friend(user_id=2, friend_id=4)
  friend8 = Friend(user_id=2, friend_id=3)

  db.session.add(friend1)
  db.session.add(friend2)
  db.session.add(friend3)
  db.session.add(friend4)
  db.session.add(friend5)
  db.session.add(friend6)
  db.session.add(friend7)
  db.session.add(friend8)
  

  db.session.commit()


def undo_friends():
  db.session.execute('TRUNCATE categories CASCADE')
  db.session.commit()