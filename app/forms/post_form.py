from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, DateTimeField, FileField
from wtforms.validators import DataRequired
from datetime import datetime

class PostForm(FlaskForm):
  user_id=IntegerField('user id', validators=[DataRequired()])
  body = TextAreaField('body')
  post_img = FileField('post_img')
  post_video = FileField('post_video')
  created_on = DateTimeField(datetime.utcnow(), [DataRequired()])