import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGComment, getGComment } from '../../store/gameComment'
import { useParams } from 'react-router'
import './GameCommentForm.css'


function GameForm () {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser.user)
  const games = useSelector((state)=> Object.values(state.game))
 

  const {gameId} = useParams()
  
 
  const userId = user.id 
 
  const [body, setBody] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    const gameComment = {
      userId, 
      gameId,
      body 
    }
    await dispatch(createGComment(gameComment))
    await dispatch(getGComment())
    setBody("")
  }


  return (
    <>
    <form className='game-form' onSubmit={handleSubmit} >
      <input
      className='game-comment-input'
      value={body}
      type='text'
      onChange={(e) => setBody(e.target.value)}
      placeholder='Leave a comment'>
      </input>
      <button className='submit-comment' type='submit' value='submit'>
        <i className="far fa-share-square"></i> Submit Comment
      </button>
    </form>
    </>
  )
}

export default GameForm