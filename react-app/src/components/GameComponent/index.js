import React from 'react'
import { NavLink } from 'react-router-dom'
import './game.css'


function Game({ g, genre }) {
  return (
    <>
      <div className='game-div'>
        <NavLink to={`/games/${g?.id}`}>
          <img className='game-img' src={g?.background_image} alt='game' />
        </NavLink>
        <div className = 'game-info'>
          <div className = 'rating'>Rating {g?.rating}</div>
          <NavLink className='title' to={`/games/${g?.id}`}>{g?.name}</NavLink>
          <NavLink className='category' to={`/genres/${genre?.id}`}>{genre?.name}</NavLink>
        </div>
      </div>
    </>
  )
}



export default Game