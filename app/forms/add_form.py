from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class AddGameForm(FlaskForm):
  user_id = IntegerField('userId', [DataRequired()])
  game_id = IntegerField('gameId', [DataRequired()])