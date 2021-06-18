import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from '../../store/game'
import { useParams } from 'react-router'
import { getCategory } from '../../store/category'
import GameForm from '../GameCommentForm'
import './GamePage.css'
import { getGComment } from '../../store/gameComment'
import GameComment from '../CommentComponent'
import { getUser } from '../../store/user'
import GameButton from '../GameButton'
import { getUserGames, deleteGame } from '../../store/userGames'

function GamePage () {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const gameItems = useSelector(state => state.game)
  const categories = useSelector(state => Object.values(state.category))
  const comments = useSelector(state => Object.values(state.gameComment))
  const users = useSelector(state => Object.values(state.users))
  const games = useSelector(state => Object.values(state.joinsIds))
  const currentUser = useSelector(state => state.currentUser.user)

  const {gameId} = useParams()
  const game = gameItems[gameId]
  
  let userId
  if(currentUser){
    userId = currentUser.id
  } else {
    userId = 0
  }
  
  let newGameId
  let newGame
  if(games.length <= 0) {
    newGame = 
      <GameButton/>
  }
  {games.map(userGame => {
    if((userGame?.game_id == gameId && userGame?.user_id == userId)) {
      newGameId = userGame?.id
    }
    if(!newGameId) {
      newGame = 
      <GameButton/>
    } else {
      newGame = 
      <a className='delete-game' onClick={() => deleteAGame(newGameId)}>
     <i class="fas fa-gamepad"></i><div>Remove Game</div>
     </a>
    }
  })}

  if(!currentUser) {
    newGame =
      <>
      <div></div>
      </>
  } 
  
  useEffect(async() => {
    await dispatch(getUser())
    await dispatch(getCategory())
    await dispatch(getGames(gameId))
    await dispatch(getGComment(gameId))
    await dispatch(getUserGames(userId))
    await setLoaded(true)
  }, [dispatch])
  

  let commentG
  if(!currentUser) {
    commentG =
    <>
    <div></div>
    </>
  } else {
    commentG =
    <>
    <GameForm />
    </>
  }

   const deleteAGame = async(gameId) => {
   await dispatch(deleteGame(gameId))
   await dispatch(getUserGames(userId))
 }

  return (
    <>
    {loaded && (
    <>
      <div className='game-page'>
        <div className='game-img-title-container'>
        <img src={game?.img} className='game-pic'/>
        <div className='gameP-info'>
          <div className='title-div'>
            <h1 className='game-title'>{game?.title}</h1>
            {newGame}
          </div>
          {categories.map((category) => (
            (category?.id == game?.category_id ? (
              <span className='category'>{category.name}</span>
            ): null)
          ))}
        <div className='gameO-info'>
          {game?.description}
        </div>
        </div>
        </div>
        <span>
          <hr className ='game-span'/>
        </span>
        <div className='game-form'>
          {commentG}
        </div>
        <span>
          <hr/>
        </span>
        {users.map((user) => (
          <>
        {comments.map((comment) => (
          (comment?.game_id == game?.id && comment?.user_id == user?.id ? (
            <GameComment comment={comment} user={user} />
            ): null)
            ))}
          </>
        ))}
      </div>
    </>
    )}
    </>
  )
}
  

  
  export default GamePage