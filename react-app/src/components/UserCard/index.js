import React from 'react'
import { NavLink } from 'react-router-dom'
import './UserCard.css'


function UserCard({ user }) {
  return (
    <>
      <div className='user-div'>
        <NavLink className='image-div' to={`/users/${user?.id}`}>
          <img className='user-img' src={user?.avatar} alt='user'/>
        </NavLink>
        <div className= 'user-info'>
          <NavLink className='card-userName' to={`/users/${user?.id}`}>{user?.username}</NavLink>
        </div>
      </div>
    </>
  )
}

export default UserCard