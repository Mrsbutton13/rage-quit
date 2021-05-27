from flask_wtf import FlaskForm
from wtforms import IntegerField, DateTimeField, StringField
from wtforms.validators import DataRequired
from datetime import datetime


class FriendForm(FlaskForm):
  id = IntegerField('id', [DataRequired])
  user_id = IntegerField('userId', [DataRequired()])
  friend_id = IntegerField('friendId', [DataRequired()])
  timeSent = DateTimeField(datetime.utcnow(), [DataRequired()])
  status = StringField('status')