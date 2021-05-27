import React from 'react'
import { NavLink } from 'react-router-dom'
import './game.css'


function Game({ game, category }) {
  return (
    <>
      <div className='game-div'>
        <NavLink to={`/games/${game?.id}`}>
          <img className='game-img' src={game?.img} alt='game' />
        </NavLink>
        <div className = 'game-info'>
          <NavLink className='title' to={`/games/${game?.id}`}>{game?.title}</NavLink>
          <NavLink className='category' to={`/category/${category?.id}`}>{category?.name}</NavLink>
        </div>
      </div>
    </>
  )
}



export default Game