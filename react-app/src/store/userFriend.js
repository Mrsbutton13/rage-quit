const SET_USERFRIEND = 'userFriend/setFriend'


const setFriend = (userFriend) => ({
  type: SET_USERFRIEND,
  userFriend
})


export const getUserFriend = (userId) => async(dispatch) => {
  const res = await fetch(`/api/friends/${userId}`)
  const data = await res.json()
  console.log(data)
  dispatch(setFriend(data.userFriend))
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_USERFRIEND:
      newState = {}
      action.userFriend.forEach(friend => {
        newState[friend.id] = friend
      })
      return newState
    default:
      return state
  }
}

export default reducer