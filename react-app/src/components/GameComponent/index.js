import React from 'react'
import { NavLink } from 'react-router-dom'
import './game.css'


function Game({ game }) {
  return (
    <>
      <div className='game-div'>
        <NavLink to={`/games/${game?.id}`}>
          <img className='game-img' src={game?.background_image} alt='game' />
        </NavLink>
        <div className = 'game-info'>
          <div className = 'rating'>Rating {game?.rating}</div>
            <NavLink className='title' to={`/games/${game?.id}`}>{game?.name}</NavLink>
          {game?.genres.map(genre => (
            <NavLink className='category' to={`/genres/${genre?.id}`}>{genre?.name}</NavLink>
          ))}
        </div>
      </div>
    </>
  )
}



export default Game