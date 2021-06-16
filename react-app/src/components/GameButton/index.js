import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addGame, getUserGames } from '../../store/userGames'

function GameButton () {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser.user)

  const { gameId } = useParams()
  const userId = currentUser.id 

 const addAGame = async (e) => {
   e.preventDefault()
   const newGame = {
     userId,
     gameId
   }
   await dispatch(addGame(newGame))
   await dispatch(getUserGames(userId))
 }
  
  return (
    <>
    <a className='add-game' onClick={addAGame}>
     <i className="fas fa-gamepad"></i> Add Game</a>
    </>
  )
}


export default GameButton