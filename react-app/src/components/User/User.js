import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteFriend, getFriend } from "../../store/friend";
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

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const [loaded, setLoaded ] = useState(false)
  const posts = useSelector((state) => Object.values(state.post))
  const friends = useSelector((state) => Object.values(state.friend))
  const users = useSelector((state) => Object.values(state.users))
  const games = useSelector((state) => Object.values(state.game))
  const userGames = useSelector((state) => Object.values(state.userGame))
  const currentUser = useSelector(state => state.currentUser.user)

  const { userId }  = useParams();
  const currentUserId = currentUser.id
  console.log(users)

  useEffect( async () => {
    await dispatch(getPost())
    await dispatch(getFriend(userId))
    await dispatch(getUser())
    await dispatch(getGames())
    await dispatch(getUserGames())
    await dispatch(setCurrentUser())
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

  let newFriend 
  if(!friends.length){
    newFriend = 
        <>
        <FriendButton />
        </>
  } else {
    {friends.map(friend => {
      if((friend?.user_id == currentUserId && friend?.friend_id == userId) ||
      (friend?.user_id == userId && friend?.friend_id == currentUserId)) {
        newFriend =
        <a className='delete-button' onClick={() => deleteAFriend(friend.id)}>
          <i class="fas fa-user-minus"></i> 
          Delete Friend</a>
      } else {
        newFriend = 
        <>
        <FriendButton />
        </>
      }
    })}
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
          {friends.map((friend) => (
            <>
            {users.filter(u => (u?.id === friend?.friend_id && user?.id === friend?.user_id) 
              || (u?.id === friend?.user_id && user?.id === friend?.friend_id)).map(u => (
                <div className='friendU'>
                  <span>
                    <hr/>
                  </span>
                  <NavLink className='friendU-div' to={`/users/${u.id}`}>
                    <img className='friendU-img' src={u?.avatar}/>
                  </NavLink>
                  <NavLink className='friendU-name' to={`/users/${u.id}`}>
                    {u?.username}
                  </NavLink>
                  <span>
                    <hr/>
                  </span>
                </div>
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
