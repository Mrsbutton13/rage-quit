import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteFriend, getFriend } from "../../store/currentUserFriend";
import { getPost } from '../../store/post'
import FriendButton from "../FriendButton";
import { NavLink, Link } from 'react-router-dom'
import Post from '../PostComponent'
import { getUser } from "../../store/user";
import { getUserGames } from '../../store/currentUserGame'
import { getGames } from '../../store/game'
import {getOneUser} from '../../store/otherUser'
import './User.css'
import UserGame from "../UserGameComponent";
import { setCurrentUser } from "../../store/currentUser";
import Footer from "../Footer";
import { getUserFriend } from "../../store/userFriend";

function User() {
  const dispatch = useDispatch()
  const [loaded, setLoaded ] = useState(false)
  const userFriends = useSelector((state) => Object.values(state.friend))
  const users = useSelector((state) => Object.values(state.users))
  const games = useSelector((state) => Object.values(state.game))
  const userGames = useSelector((state) => Object.values(state.userGame))
  const currentUser = useSelector(state => state.currentUser.user)
  const friends = useSelector((state) => Object.values(state.userFriend))
  const user = useSelector((state) => state.otherUser.otherUser)
  
  const { userId }  = useParams();
  const currentUserId = currentUser.id

  let friendId
  let newFriend
  {userFriends.map(userFriend => {
    if((currentUserId == userFriend?.user_id && userId == userFriend?.friend_id) || 
      (currentUserId == userFriend?.friend_id && userId == userFriend?.user_id)) {
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
    await dispatch(getPost())
    await dispatch(getFriend())
    await dispatch(getUser())
    await dispatch(getOneUser(userId))
    await dispatch(getGames())
    await dispatch(getUserGames())
    await dispatch(setCurrentUser())
    await dispatch(getUserFriend(userId))
    setLoaded(true)
  }, [dispatch])

    
  const deleteAFriend = async(friendId) => {
    await dispatch(deleteFriend(friendId))
    await dispatch(getUserFriend(userId))
    await dispatch(getFriend())
  }
  
  
  return (
    <>
    {loaded && (
      <>
      <div className='mainU-container'>
        <div className='profileU-container'>
          <img className='userU-pic' src={user.avatar}/>
          <div className='userU-info'>
            <h1 className='welcomeU-user'>{user.username}</h1>
            {newFriend}
            <p>{user.bio}</p>
          </div>
        </div>
        <div className='friendsU-div'>
            <h3 className='friendU-title'>{user.username}'s friends</h3>
          <div className='friendsU-inner'>  
            {friends.map(friend => (
              <div key={friend.id} >
              {users.map(oneUser => (
                ((oneUser?.id == friend?.user_id && user?.id == friend?.friend_id) || 
                (oneUser?.id == friend?.friend_id && user?.id == friend?.user_id) ? (
                  <div key={oneUser.id} className='friendU'>
                  <span>
                    <hr/>
                  </span>
                  <a className='friendU-div' onClick={() => {window.location.href=`/users/${oneUser?.id}`}}>
                    <img className='friendU-img' src={oneUser?.avatar}/>
                  </a>
                  <a className='friendU-name' onClick={() => {window.location.href=`/users/${oneUser?.id}`}}>
                    {oneUser?.username}
                  </a>
                  <span>
                    <hr/>
                  </span>
                </div> 
                ): null)
                ))}
                </div>
            ))}
          </div>
        </div>
        <div className='postU'>
          {/* {posts?.map((post) => (
            (userId == post?.user_id ? (
              <Post post={post} user={user}/>
              ): null)
              ))} */}
        </div>
        <div className='userU-games'>
          <div className='yourU-games'>
            <h3 className='userU-title'>{user?.username}'s Games</h3>
          </div>
          <span>
            <hr/>
          </span>
          <div className='innerU-games'>
          {userGames.map(userGame => (
            <div key={userGame.id}>
           {games.map(game => (
             (game?.id === userGame?.game_id && userId == userGame?.user_id ? (
               < UserGame key={game.id} game={game} />
               ):null)
               ))}
          </div>
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
