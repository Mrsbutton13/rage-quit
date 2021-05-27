import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addGame, deleteGame, getUserGames } from '../../store/userGame'

function GameButton () {
  const dispatch = useDispatch()

  const games = useSelector(state => Object.values(state.userGame))
  const user = useSelector(state => state.currentUser.user)
 

  const { gameId } = useParams()
  const userId = user.id 

 const addAGame = async (e) => {
   e.preventDefault()
   const newGame = {
     userId,
     gameId
   }
   await dispatch(addGame(newGame))
   await dispatch(getUserGames())
 }

 const deleteAGame = async(gameId) => {
   await dispatch(deleteGame(gameId))
   await dispatch(getUserGames())
 }

 let add
 if(!games.length) {
    add = 
     <>
   <a className='add-game' onClick={addAGame}>
     <i class="fas fa-gamepad"></i> Add Game</a>
     </>
 } else {
   games.map(game => {
     if(userId == game?.user_id && gameId == game?.game_id) {
       add =
       <>
     <a className='delete-game' onClick={() => deleteAGame(game.id)}>
     <i class="fas fa-gamepad"></i><div>Remove Game</div>
     </a>
     </>
   }
   else {
     add = 
     <>
   <a className='add-game' onClick={addAGame}>
     <i class="fas fa-gamepad"></i> Add Game</a>
     </>
   }
  })
}
  
  return (
    <>
    {add}
    </>
  )
}


export default GameButton