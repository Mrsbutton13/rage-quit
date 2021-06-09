import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCurrentUser } from '../../store/currentUser'
import { getFriend } from '../../store/currentUserFriend'
import { getGames } from '../../store/game'
import { getPost } from '../../store/post'
import { getUser } from '../../store/user'
import { getUserGames } from '../../store/userGame'
import Footer from '../Footer'
import Post from '../PostComponent'
import UserGame from '../UserGameComponent'
import PostFormModal from '../UserPost'
import './Profile.css'


function Profile () {
  const dispatch = useDispatch()
  const [loaded, setLoaded ] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.user)
  const users = useSelector((state) => Object.values(state.users))
  const friends = useSelector((state) => Object.values(state.friend))
  const games = useSelector((state) => Object.values(state.game))
  console.log(currentUser)

  useEffect(async() => {
   await dispatch(setCurrentUser())
  //  await dispatch(getUser())
   await dispatch(getFriend())
   await dispatch(getGames())
   await setLoaded(true)
  }, [dispatch])
  
  return (
    <>
    {loaded && (
      <>
      <div className='main-container'>
        <div className='profile-container'>
          <img className='user-pic' src={currentUser?.avatar}/>
          <div className='user-info'>
            <h1 className='welcome-user'>Welcome {currentUser?.username}</h1>
            <h2 className='gamertag'>Your Gamertag: {currentUser?.gamertag}</h2>
          </div>
        </div>
        <div className='friends-div'>
          <h3 className='friend-title'>People you game with</h3>
          {friends.map((friend) => (
          <div className='friends-inner'>          
            <>
            {users?.filter(user => (user?.id === friend?.friend_id) && (currentUser?.id === friend?.user_id) || 
            (user?.id === friend?.user_id && currentUser?.id === friend?.friend_id)).map(user => (
                <div key={user?.id} className='friend'>
                  <span>
                    <hr/>
                  </span>
                  <NavLink className='friend-div' to={`/users/${user.id}`}>
                    <img className='friend-img' src={user?.avatar}/>
                  </NavLink>
                  <NavLink className='friend-name' to={`/users/${user.id}`}>
                    {user?.username}
                  </NavLink>
                  <span>
                    <hr/>
                  </span>
                </div>
            ))}
            </>
          </div>
            ))}
        </div>
        <div className='add-post'>
          <PostFormModal/>
        </div>
        <div className='post'>
        {currentUser.posts?.map((post) => (
          <>    
              <Post post={post} user={currentUser}/>
          </>
        ))}
        </div>'
        <div className='user-games'>
          <div className='your-games'>
            <h3 className='user-title'>Your Games</h3>
          <span>
            <hr/>
          </span>
            <div className='inner-games'>
              {currentUser.userGames.map(userGame => (
                <>
                {games.filter(game => game?.id === userGame?.game_id && currentUser?.id === userGame?.user_id).map(game => (
                  <UserGame game={game}/>
                ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    <Footer/>
    </>
  )
}



export default Profile