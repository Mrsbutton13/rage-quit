import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteFriend, getFriend } from "../../store/currentUserFriend";
import { getPost } from '../../store/post'
import FriendButton from "../FriendButton";
import { NavLink } from 'react-router-dom'
import Post from '../PostComponent'
import { getUser } from "../../store/user";
import { getUserGames } from '../../store/userGame'
import { getGames } from '../../store/game'
import './User.css'
import UserGame from "../UserGameComponent";
import { setCurrentUser } from "../../store/currentUser";
import Footer from "../Footer";
import { getUserFriend } from "../../store/userFriend";
import { getUserPost} from '../../store/usersPosts'

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const [loaded, setLoaded ] = useState(false)
  const userFriends = useSelector((state) => Object.values(state.friend))
  const posts = useSelector((state) => Object.values(state.userPost))
  const users = useSelector((state) => Object.values(state.users))
  const games = useSelector((state) => Object.values(state.game))
  const userGames = useSelector((state) => Object.values(state.userGame))
  const currentUser = useSelector(state => state.currentUser.user)
  const friends = useSelector((state) => Object.values(state.userFriend))
  
  const { userId }  = useParams();
  const currentUserId = currentUser.id

  let friendId
  {userFriends.map(userFriend => {
    if((currentUserId == userFriend?.user_id && userId == userFriend?.friend_id) || 
      (currentUserId == userFriend?.friend_id && userId == userFriend?.user_id)) {
        friendId = userFriend?.id
      }
  })}

  let newFriend
  if(!friendId){
    newFriend = 
      <>
        <FriendButton />
      </>
    } else {
      newFriend =
      <a className='delete-button' onClick={() => deleteAFriend(friendId)}>
      <i class="fas fa-user-minus"></i> 
      Delete Friend</a>
    }


  useEffect( async () => {
    await dispatch(getUserPost(userId))
    await dispatch(getFriend())
    await dispatch(getUser())
    await dispatch(getGames())
    await dispatch(getUserGames())
    await dispatch(setCurrentUser())
    await dispatch(getUserFriend(userId))
    setLoaded(true)
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
    
  const deleteAFriend = async(friendId) => {
    await dispatch(deleteFriend(friendId))
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
              <>
              {users.map(oneUser => (
                ((oneUser?.id == friend?.user_id && userId == friend?.friend_id) || 
                (oneUser?.id == friend?.friend_id && userId == friend?.user_id) ? (
                  <div className='friendU'>
                  <span>
                    <hr/>
                  </span>
                  <NavLink className='friendU-div' to={`/users/${oneUser?.id}`}>
                    <img className='friendU-img' src={oneUser?.avatar}/>
                  </NavLink>
                  <NavLink className='friendU-name' to={`/users/${oneUser?.id}`}>
                    {oneUser?.username}
                  </NavLink>
                  <span>
                    <hr/>
                  </span>
                </div> 
                ): null)
              ))}
              </>
            ))}
          </div>
        </div>
        <div className='postU'>
          {posts?.map((post) => (
            (userId == post?.user_id ? (
              <Post post={post} user={user}/>
              ): null)
              ))}
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
            <>
           {games.map(game => (
             (game?.id === userGame?.game_id && userId == userGame?.user_id ? (
               < UserGame game={game} />
               ):null)
               ))}
            </>
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
