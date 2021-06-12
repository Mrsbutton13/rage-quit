import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCurrentUser } from '../../store/currentUser'
import { getFriend } from '../../store/currentUserFriend'
import { getGames } from '../../store/game'
import Post from '../PostComponent'
import UserGame from '../UserGameComponent'
import PostFormModal from '../UserPost'
import './Profile.css'

function Profile () {
  const dispatch = useDispatch()
  const [ loaded, setLoaded ] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.user)
  const users = useSelector((state) => Object.values(state.users))
  const friends = useSelector((state) => Object.values(state.friend))
  const games = useSelector((state) => Object.values(state.game))
  
  useEffect(async() => {
   await dispatch(setCurrentUser())
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
          <div className='user-info'>
          <img className='user-pic' src={currentUser?.avatar}/>
            <h1 className='welcome-user'>{currentUser?.username}</h1>
          </div>
          <span>
            <hr/>
          </span>
          <div className='links'>
          <div className='link-icons'>
              <i class="fas fa-home"></i> 
              <i className="fas fa-user-edit"></i> 
              <i class="fas fa-user"></i> 
            </div>
            <div className='link-titles'>
              <span className='home'>Home</span>
              <span className='edit'>Edit profile</span>
              <span className='public'>View public profile</span>
          </div>
          </div>
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
        <div className='posts' >
        <div className='add-post'>
          <PostFormModal />
        </div>
        <div className='post'>
        {currentUser.posts?.map((post) => (
          <>    
              <Post post={post} user={currentUser}/>
          </>
        ))}
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
      </div>
      </>
    )}
    </>
  )
}




export default Profile