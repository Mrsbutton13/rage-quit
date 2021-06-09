import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteGComment, getGComment } from '../../store/gameComment'
import './Comment.css'


function GameComment({user, comment }){
  const dispatch = useDispatch()

  const deleteComment = async (commentId) => {
    await dispatch(deleteGComment(commentId))
    await dispatch(getGComment())
  }
  
  return (
    <>
    <div className='comment-container'>
      <img className='user-ava' src={user?.avatar} alt='user'/>
      <NavLink className='username' to={`/users/${user?.id}`}>
        {user?.username}
        </NavLink>
      <div className='comment'>
        {comment?.body}
      </div>
      <span>
        <hr/>
      </span>
      <div className='likes'>
      <div>
        <i className="far fa-thumbs-up"></i>
        Like
      </div>
      <div>
        <i className="far fa-comment"></i>
        Reply
      </div>
      <div >
        <a onClick={() => deleteComment(comment?.id)}>
        <i className="far fa-trash-alt"></i>
        Delete
        </a>
      </div>
      </div>
    <span>
        <hr/>
      </span>
    </div>
    </>
  )
}
  
  


export default GameComment