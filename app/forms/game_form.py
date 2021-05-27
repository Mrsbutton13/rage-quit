from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired



class GameCommentForm(FlaskForm):
  user_id = IntegerField('userId', [DataRequired()])
  game_id = IntegerField('gameId', [DataRequired()])
  body = TextAreaField('body')