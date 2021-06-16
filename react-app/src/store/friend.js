const ADD_FRIEND = 'friend/addFriend'
const REMOVE_FRIEND = 'friend/removeFriend'
const SET_FRIENDID = 'friend/setFriendId'

const setFriendId = (friend) => ({
  type: SET_FRIENDID,
  friend
}) 

const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

const removeFriend = () => ({
  type: REMOVE_FRIEND
})

export const deleteFriend = (friendId) => async() => {
  await fetch(`/api/friends/${friendId}`, {method: 'DELETE'})
}

export const getFriendId = () => async (dispatch) => {
  const res = await fetch('/api/friends')
  const data = await res.json()
  dispatch(setFriendId(data.friendId))
}


export const addAFriend = (friend) => async(dispatch) => {
  const { user_id, userId, timeSent, status } = friend
  const res = await fetch('/api/friends', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user_id,
      userId,
      timeSent,
      status
    })
  })

  if(res.ok) {
    const data = await res.json()
    dispatch(addFriend(data.friend))
    return data
  }
}


function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_FRIEND:
      newState = {...state}
      newState['friend'] = action.friend 
      return newState
    case SET_FRIENDID:
      newState = {}
      action.friend.forEach(person => {
        newState[person.id] = person
      })
      return newState
    case REMOVE_FRIEND:
      return {...state, friend: null}
    default:
      return state
  }
}


export default reducer