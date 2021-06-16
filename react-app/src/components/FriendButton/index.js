import React, { useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addAFriend, getFriendId } from '../../store/friend'

import './FriendButton.css'
import { getUserFriend } from '../../store/userFriend'

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
    await dispatch(getUserFriend(userId))
    await dispatch(getFriendId())
  };

  
  return (
    <>
    <a className='friend-button' onClick={addFriend} >
      <i className="fas fa-user-plus"></i> 
      Add Friend</a>
    </>
  )
}


export default FriendButton
