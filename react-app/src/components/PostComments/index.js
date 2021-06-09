import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getPComment } from '../../store/postComment'


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
  },[dispatch])


  return (
    <>
    <a className='comments' onClick={openMenu}>
      <i className="fas fa-comment-dots"></i> Comments
    </a>

    {showComments && (
      <>
      {postComments.map((comment) => (
        <>
        {users.filter(user => user?.id === comment?.user_id && post?.id === comment?.post_id).map(user => (
          <div className='post-container'>
          <img className='post-user' src={user?.avatar} alt='user avatar'/>
          <NavLink className='post-username' to={`/users/${user?.id}`}>
            {user?.username}
          </NavLink>
          <div className='post-body'>
            {comment?.body}
          </div>
          </div>
          ))}
        </>
          ))}
      </>
    )}
    </>
  )
}

export default PostComments