import React from 'react'
import { NavLink } from 'react-router-dom'
import './Friends.css'


function FriendCard({ user }) {
  return (
    <>
      <div className='card-div'>
          <NavLink className='card-friend' to={`/users/${user?.id}`}>
            <img className='friend-img' src={user?.avatar}/>
          </NavLink>
        <div className= 'friend-info'>
          <NavLink className='friend-link' to={`/users/${user?.id}`}>{user?.username}</NavLink>
        </div>
      </div>
    </>
  )
}

export default FriendCard