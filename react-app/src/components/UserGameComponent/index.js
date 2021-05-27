import React from 'react'
import { NavLink } from 'react-router-dom'
import './UserGame.css'


function UserGame({ game }) {
  return (
    <>
      <div className='user-game-div'>
        <NavLink to={`/games/${game?.id}`}>
          <img className='user-game-img' src={game?.img} alt='game' />
        </NavLink>
        <div className = 'user-game-info'>
          <NavLink className='user-game-title' to={`/games/${game?.id}`}>{game?.title}</NavLink>
        </div>
      </div>
    </>
  )
}



export default UserGame