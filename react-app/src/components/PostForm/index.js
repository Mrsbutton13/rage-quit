import React, { useState} from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { getPost, createPost } from '../../store/post'
import './PostForm.css'

function PostForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [createdOn, setCreatedOn] = useState('')
  const user = useSelector((state) => state.currentUser.user)
  const userId = user.id


  const [body, setBody] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreatedOn(moment(createdOn).format('MMMM Do YYYY, h:mm:ss a'))
    const post = {
      body,
      userId,
      createdOn
    }
    await dispatch(createPost(post))
    console.log(createdOn)
    await dispatch(getPost())
    await setBody("")
    
  }


  return (
    <>
      <form className='post-form' onSubmit={handleSubmit} >
        <h1 className='post-title' >Let others know what you're thinking. </h1>
          <textarea
          className='post-input' 
          value={body}
          type='text' 
          onChange={(e) => setBody(e.target.value)}
          placeholder='What cha thinking?' >
          </textarea>
          <button className='post-button' type='submit' value='submit'>
            <i class="far fa-share-square"></i>
          </button>
      </form>

    </>
  )
}

export default PostForm
