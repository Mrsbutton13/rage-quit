from app.models import db
from app.models import Category


def seed_categories():
  category1 = Category(name='Action')
  category2 = Category(name='Adventure')
  category3 = Category(name='Puzzle')
  category4 = Category(name='Racing')
  category5 = Category(name='RPG')
  category6 = Category(name='Shooter')
  category7 = Category(name='Sports')
  category8 = Category(name='Strategy')

  db.session.add(category1)
  db.session.add(category2)
  db.session.add(category3)
  db.session.add(category4)
  db.session.add(category5)
  db.session.add(category6)
  db.session.add(category7)
  db.session.add(category8)
  

  db.session.commit()


def undo_categories():
  db.session.execute('TRUNCATE categories CASCADE')
  db.session.commit()