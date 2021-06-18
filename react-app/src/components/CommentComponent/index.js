import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setCurrentUser } from '../../store/currentUser'
import { deleteGComment, getGComment } from '../../store/gameComment'
import './Comment.css'


function GameComment({user, comment }){
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.user)
  
  useEffect(async() => {
    await dispatch(setCurrentUser())
  }, [dispatch])

  const deleteComment = async (commentId) => {
    await dispatch(deleteGComment(commentId))
    await dispatch(getGComment())
  }


  let deleteUserComment 
  if(currentUser?.id === comment?.user_id) {
    deleteUserComment=
    <>
    <a onClick={() => deleteComment(comment?.id)}>
      <i className="far fa-trash-alt"></i>
      Delete
    </a>
    <span>
      <hr/>
    </span>
      </>
  } else {
    deleteUserComment=
    <>
    </>
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
      <div >
        {deleteUserComment}
      </div>
      </div>
    </div>
    </>
  )
}
  
  


export default GameComment