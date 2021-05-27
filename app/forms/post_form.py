from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired
from datetime import datetime

class PostForm(FlaskForm):
  user_id=IntegerField('user id', [DataRequired()])
  body = TextAreaField('body')
  created_on = DateTimeField(datetime.utcnow(), [DataRequired()])