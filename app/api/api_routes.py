from flask import Blueprint, request
from app.models.db import db 
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc, or_

from app.models import Game, Category, Post, PostComment, User, Friend, GameComment, Platform, UserGame
from app.forms import post_form, game_form, friend_form, add_form

api_routes = Blueprint('/api', __name__)





@api_routes.route('/platforms')
def api_get_platform():
  platforms = Platform.query.all()
  return {'platform': [platform.to_dict() for platform in platforms]}


