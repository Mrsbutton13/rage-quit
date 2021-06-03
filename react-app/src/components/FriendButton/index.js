import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addAFriend, getFriend } from '../../store/currentUserFriend'
import './FriendButton.css'

function FriendButton () {
  const dispatch = useDispatch()
  
  const currentUser = useSelector(state => state.currentUser.user)
  
  
  const [timeSent, setTimeSent] = useState('')
  const [status, setStatus] = useState('sent')

  const { userId } = useParams()
  const currentUserId = currentUser.id 


  const addFriend = async (e) => {
    e.preventDefault()
    setTimeSent(moment(timeSent).format('MMMM Do YYYY, h:mm:ss a'))
    const friend = {
      userId,
      currentUserId,
      timeSent,
      status
    }
    await dispatch(addAFriend(friend));
    await dispatch(getFriend())
  };

  
  return (
    <>
    <a className='friend-button' onClick={addFriend} >
      <i class="fas fa-user-plus"></i> 
      Add Friend</a>
    </>
  )
}


export default FriendButton
