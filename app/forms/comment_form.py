from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired



class PostCommentForm(FlaskForm):
  user_id = IntegerField('userId', [DataRequired()])
  post_id = IntegerField('postId', [DataRequired()])
  body = TextAreaField('body')