import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPComment, getPComment } from '../../store/postComment'
import '../PostForm/PostForm.css'

function PostComment({ post }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUser.user)
  const [body, setBody] = useState('')

  const postId = post.id
  const userId = user.id 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postComment = {
      userId,
      postId,
      body
    }
    await dispatch(createPComment(postComment))
    setBody('')
    await dispatch(getPComment())
  }

  return (
    <>
      <form className='post-form' onSubmit={handleSubmit}>
        <h1 className='post-title' >Leave a reply</h1>
      <textarea
      className='post-input'
      value={body}
      type='text'
      onChange={(e) => setBody(e.target.value)}
      placeholder='Leave a comment'>
      </textarea>
      <button className='post-button' type='submit' value='submit'>
        <i className="far fa-share-square"></i>
      </button>
    </form>
    </>
  )
  
}

export default PostComment