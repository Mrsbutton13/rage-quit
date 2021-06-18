import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCurrentUser } from '../../store/currentUser'
import { getFriend } from '../../store/currentUserFriend'
import { getPost } from '../../store/post'
import { getCurrentUserGames } from '../../store/currentUserGame'
import Post from '../PostComponent'
import UserGame from '../UserGameComponent'
import PostFormModal from '../UserPost'
import './Profile.css'

function Profile () {
  const dispatch = useDispatch()
  const [ loaded, setLoaded ] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.user)
  const friends = useSelector((state) => Object.values(state.currentUsersFriend))
  const userGames = useSelector((state) => Object.values(state.currentUserGame))
  const posts = useSelector((state) => Object.values(state.post))
  
  let usersFriends = []
  if(friends.length <= 0) {
    usersFriends.push(currentUser)
  } else {
    {friends.map(usersFriend => {
      usersFriends.push(usersFriend)
    })}
  }

  const sortedPosts = posts.sort((a,b) => a.created_on < b.created_on ? 1: -1)
  useEffect(async() => {
   await dispatch(setCurrentUser())
   await dispatch(getCurrentUserGames())
   await dispatch(getFriend())
   await dispatch(getPost())
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
          <span className='user-span'>
            <hr/>
          </span>
          <div className='links'>
            <div className='link-icons'>
              <NavLink className='home' to={'/'}>
                <i className="fas fa-home"></i> 
              </NavLink>
              <NavLink  className='public' to={`/users/${currentUser.id}`}>
                <i className="fas fa-user"></i> 
              </NavLink>
            </div>
            <div className='link-titles'>
              <NavLink className='home' to={'/'}>
              <span>Home</span>
              </NavLink>
              <NavLink  className='public' to={`/users/${currentUser.id}`}>
              <span>View public profile</span>
              </NavLink>
            </div>
          </div>
          <div className='your-games'>
            <h3 className='user-title'>Your Games</h3>
            <span>
              <hr/>
            </span>
            <div className='inner-games'>
              {userGames.map(game => (
                <UserGame key={game?.id} game={game}/>
              ))}
            </div>
          </div>
        </div>
        <div className='posts' >
          <div className='add-post'>
            <PostFormModal />
          </div>
          <div className='post'>
            {sortedPosts.map(post => (
              <div key={post?.id}>
              {usersFriends.map(user => (
              (user?.id === post?.user_id ? (
                <Post key={user?.id} post={post} user={user} />
              ) : null)
                ))}
                </div>
    ))}
          </div>
        </div>
        <div className='friends-div'>
          <h3 className='friend-title'>People you game with</h3>
          <span className='user-span'>
            <hr/>
          </span>
          <div className='friends-inner'>          
          {friends.map((friend) => (
            (currentUser?.id !== friend?.id ? (
              <div key={friend?.id}>
                <div className='friend'>
                  <NavLink className='friend-div' to={`/users/${friend?.id}`}>
                    <img className='friend-img' src={friend?.avatar}/>
                  </NavLink>
                  <NavLink className='friend-name' to={`/users/${friend?.id}`}>
                    {friend?.username}
                  </NavLink>
                </div>
                  <span>
                    <hr/>
                  </span>
            </div>
            ): null) 
            ))}
            </div>
        </div>
      </div>
      </>
    )}
    </>
  )
}




export default Profile