from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/troll.png',
                bio="Spent 2002-2009 consulting about yard waste in Suffolk, NY. Spent the 80's working on hula hoops in Cuba. Spoke at an international conference about investing in glue worldwide. Spent a weekend deploying carp in West Palm Beach, FL. A real dynamo when it comes to marketing tinker toys in Edison, NJ. Set new standards for developing inflatable dolls in Hanford, CA.",
                gamertag='trolalalala2345',
                password='password')
    demo1 = User(username='Spaskisaspwesep', email="schneider.maye@thompson.biz",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.19.21+PM.png',
                bio="Spent childhood short selling wooden trains in Libya. Enthusiastic about supervising the production of jump ropes in Hanford, CA. Spent 2002-2008 building inflatable dolls in Pensacola, FL. Spent the better part of the 90's analyzing weebles in Suffolk, NY. Earned praised for my work working with shaving cream on Wall Street. Spent 2002-2007 licensing deodorant in Salisbury, MD.",
                gamertag='Hogra41',
                password='password')
    demo2 = User(username='lindseycakez8t', email="czemlak@bauch.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.20.50+PM.png',
                bio='What gets me going now is developing strategies for action figures in Cuba. Spent 2001-2004 testing the market for pond scum for no pay. Spent a weekend analyzing tattoos in the financial sector. Spent two years merchandising lint for farmers. Spent 2002-2009 researching pubic lice in New York, NY. Spent several months marketing methane with no outside help.',
                gamertag='CarbuncleCringe',
                password='password')
    demo3 = User(username='scoooooobixi', email="lexi21@kunze.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.21.02+PM.png',
                bio='Spent 2001-2007 testing the market for shaving cream in West Palm Beach, FL. Earned praised for my work lecturing about crickets in New York, NY. Crossed the country getting my feet wet with weebles for no pay. In 2009 I was consulting about dogmas in Mexico. Spent 2002-2010 investing in puppets in Fort Lauderdale, FL. Spent several years getting to know puppets in New York, NY.',
                gamertag='FreakShowRope8',
                password='password')
    demo4 = User(username='zvezanega8k', email="daphney.volkman@gmail.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.21.10+PM.png',
                bio="I can't get enough of persistent do-gooders",
                gamertag='UsufructuaryComity',
                password='password')
    demo5 = User(username='Cisiec2e', email="edyth.franecki@mante.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.21.22+PM.png',
                bio='A friend of mine traded a steak for a snowman',
                gamertag='PillalooTopaz',
                password='password')
    demo6 = User(username='estuyajuan3c', email="greichel@gmail.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.21.52+PM.png',
                bio='My clone inherited a rosebush',
                gamertag='ButterflyJuice67',
                password='password')
    demo7 = User(username='kadaravouu', email="melisa.ankunding@hotmail.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.22.14+PM.png',
                bio='No more contagious iPhone apps',
                gamertag='MaleficentAver46',
                password='password')
    demo8 = User(username='teteh24', email="schulist.emmalee@yahoo.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.48.19+PM.png',
                bio='Woke up at a crazy mausoleum',
                gamertag='Birthday37',
                password='password')
    demo9 = User(username='Tovarurodiao9', email="angela.labadie@gmail.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.48.26+PM.png',
                bio='My cat traded a steak for a bed pan',
                gamertag='CribbageSpoon16',
                password='password')
    demo10 = User(username='objectifreach', email="mylene.pfannerstill@yahoo.com",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/Screen+Shot+2021-04-22+at+7.48.42+PM.png',
                bio='Laughing hysterically at a memorable train station',
                gamertag='LucubrationNesh',
                password='password')
    demo11 = User(username='Gwalia27', email="lesch.serenity@williamson.org",
                avatar='https://myragequit.s3-us-west-1.amazonaws.com/troll.png',
                bio='My aunt traded a steak for a Britney Spears album',
                gamertag='GermolineBezoar',
                password='password')
    

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
