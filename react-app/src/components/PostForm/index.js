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
  const [post_img, setPostImg] = useState(null)
  const [post_video, setPostVideo] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreatedOn(moment(createdOn).format('MMMM Do YYYY, h:mm:ss a'))
    await dispatch(createPost({body, post_img, post_video, userId, createdOn}))
    await dispatch(getPost())
    await setBody("")
    await setPostImg(null)
    await setPostVideo("")
  }

  const addImg = (e) => {
    const image = e.target.files[0]
    setPostImg(image)
  }
  
  const updateBody = (e) => {
    setBody(e.target.value)
  }

  const updateVideo = (e) => {
    const video = e.target.files[0]
    setPostVideo(video)
  }

  return (
    <>
      <form className='post-form' onSubmit={handleSubmit} >
        <h1 className='post-title' >Let others know what you're thinking. </h1>
          <textarea
          className='post-input' 
          value={body}
          type='text' 
          onChange={updateBody}
          placeholder='What cha thinking?' >
          </textarea>
          <input 
          className='image-input'
          type='file'
          name='postImg'
          accept='image/*'
          onChange={addImg}
          ></input>
          <button className='post-button' type='submit' value='submit'>
            <i className="far fa-share-square"></i>
          </button>
      </form>

    </>
  )
}

export default PostForm
