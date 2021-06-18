import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getPComment } from '../../store/postComment'
import { getUser } from '../../store/user'
import './PostComments.css'

function PostComments({ post }) {
  const dispatch = useDispatch()
  const [showComments, setShowComments] = useState(false)
  const postComments = useSelector((state) => Object.values(state.postComment))
  const users = useSelector((state) => Object.values(state.users))

  const openMenu = () => {
    if(showComments) return 
    setShowComments(true)
  }

  useEffect(() => {
    if(!showComments) return 

    const closeMenu = () => {
      setShowComments(false)
    }
    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showComments])

  useEffect(async() => {
    await dispatch(getPComment())
    await dispatch(getUser())
  },[dispatch])


  return (
    <>
    <a className='comments' onClick={openMenu}>
      <i className="fas fa-comment-dots"></i> Comments
    </a>
    {showComments && (
      <div className='post-comment-holder'>
      {postComments.map((comment) => (
        <div key={comment?.id}>
          {users.map(user => (
            (user?.id == comment?.user_id && post?.id == comment?.post_id ? (
              <div className='postComment-container'>
                <span>
                  <hr/>
                </span>
                <img className='postComment-user' src={user?.avatar} alt='user avatar'/>
                <NavLink className='postComment-username' to={`/users/${user?.id}`}>
                  {user?.username}
                </NavLink>
                <div className='postComment-body'>
                  {comment?.body}
                </div>
                <span>
                  <hr/>
                </span>
              </div>
            ):null)
          ))}
        </div>
        ))}
      </div>
    )}
    </>
  )
}

export default PostComments