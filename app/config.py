import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  S3_BUCKET= os.environ.get('S3_BUCKET')
  S3_KEY= os.environ.get('S3_KEY')
  S3_SECRET= os.environ.get('S3_SECRET')
  S3_LOCATION = 'https://{}.s3.amazonaws.com/'.format(S3_BUCKET)
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')