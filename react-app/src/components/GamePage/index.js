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
import { getUserGames } from '../../store/userGame'
import Footer from '../Footer'


function GamePage () {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const gameItems = useSelector(state => state.game)
  const categories = useSelector(state => Object.values(state.category))
  const comments = useSelector(state => Object.values(state.gameComment))
  const users = useSelector(state => Object.values(state.users))
  const currentUser = useSelector(state => state.currentUser.user)

  let {gameId} = useParams()
  
  const game = gameItems[gameId]

  
  useEffect(async() => {
    await dispatch(getUser())
    await dispatch(getCategory())
    await dispatch(getGames(gameId))
    await dispatch(getGComment(gameId))
    await dispatch(getUserGames())
    await setLoaded(true)
  }, [dispatch])
  
  let addG 
  if(!currentUser) {
    addG =
      <>
      <div></div>
      </>
  } else {
    addG =
      <>
      <GameButton/>
      </>
  }

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

  return (
    <>
    {loaded && (
    <>
      <div className='game-page'>
        <img src={game?.img} className='game-pic'/>
        <div className='gameP-info'>
          <div className='title-div'>
            <h1 className='game-title'>{game?.title}</h1>
            {addG}
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
        <span>
          <hr/>
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
    <Footer />
    </>
  )
}
  

  
  export default GamePage