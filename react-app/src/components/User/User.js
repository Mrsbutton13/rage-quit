import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { deleteFriend, getFriendId} from "../../store/friend"
import FriendButton from "../FriendButton"
import Post from '../PostComponent'
import { getOtherUserGame } from '../../store/otherUserGames'
import {getOneUser} from '../../store/otherUser'
import './User.css'
import UserGame from "../UserGameComponent"
import { setCurrentUser } from "../../store/currentUser"
import { getUserFriend } from "../../store/userFriend"

function User() {
  const dispatch = useDispatch()
  const [loaded, setLoaded ] = useState(false)
  const userFriends = useSelector((state) => Object.values(state.friend))
  const otherUserGames = useSelector((state) => Object.values(state.otherUserGame))
  const currentUser = useSelector(state => state.currentUser.user)
  const friends = useSelector((state) => Object.values(state.userFriend))
  const user = useSelector((state) => state.otherUser.otherUser)
  
  const { userId }  = useParams();
  const currentUserId = currentUser.id
  
  let friendId
  let newFriend
  if(userFriends.length === 0) {
    newFriend = 
      <>
        <FriendButton />
      </>
  }
  {userFriends.map(userFriend => {
    if((userFriend?.friend_id == userId && currentUserId == userFriend?.user_id) || 
    (userFriend?.user_id == userId && currentUserId == userFriend?.friend_id)){
      friendId = userFriend?.id
    }
      if(!friendId){
        newFriend = 
        <>
        <FriendButton />
      </>
      } else {
        newFriend =
        <a className='delete-button' onClick={() => deleteAFriend(friendId)}>
        <i className="fas fa-user-minus"></i> 
        Delete Friend</a>
      }
  })}

  if(currentUserId == userId) {
    newFriend = 
    <>
    </>
  }

  useEffect( async () => {
    await dispatch(getFriendId())
    await dispatch(getOneUser(userId))
    await dispatch(setCurrentUser())
    await dispatch(getUserFriend(userId))
    await dispatch(getOtherUserGame(userId))
    setLoaded(true)
  }, [dispatch])

  
  const deleteAFriend = async(friendId) => {
    await dispatch(deleteFriend(friendId))
    await dispatch(getUserFriend(userId))
    await dispatch(getFriendId())
  }
  
  return (
    <>
    {loaded && (
      <>
        <div className='profileU-container'>
          <img className='userU-pic' src={user.avatar}/>
          <div className='userU-info'>
            <h1 className='welcomeU-user'>{user.username}</h1>
            {newFriend}
            <p>{user.bio}</p>
          </div>
        </div>
        <span>
          <hr/>
        </span>
      <div className='mainU-container'>
        <div className='friendsU-div'>
            <div className='friends-title'>
              <h3>{user.username}'s friends</h3>
            </div>
            <span className='postU-span'>
              <hr/>
            </span>
          <div className='friendsU-inner'>  
            {friends.map(friend => (
              (friend.id !== user.id ? (
                <div key={friend.id} className='friendU'>
                  <a className='friendU-div' onClick={() => {window.location.href=`/users/${friend?.id}`}}>
                    <img className='friendU-img' src={friend?.avatar}/>
                  </a>
                  <a className='friendU-name' onClick={() => {window.location.href=`/users/${friend?.id}`}}>
                    {friend?.username}
                  </a>
                  <span>
                    <hr/>
                  </span>
                </div> 
                  ):null)
                  ))}
          </div>
        </div>
        <div className='postU'>
          <div className='checkout-title'>
            <h3>Checkout what {user.username} is up to!</h3>
          </div>
          <span className='postU-span'>
            <hr/>
          </span>
          <div className='post-holder'>
          {user.posts.map((post) => (
            <Post key={post.id} post={post} user={user}/>
            ))}
          </div>
        </div>
        <div className='userU-games'>
          <div className='yourU-games'>
            <h3 className='userU-title'>{user?.username}'s Games</h3>
          </div>
          <span>
            <hr/>
          </span>
          <div className='innerU-games'>
          {otherUserGames.map(game => (
               <UserGame key={game.id} game={game} />
          ))} 
          </div>
        </div>
        </div>
    </>
    )}
    </>
  );
}
  
  
  
  export default User;
