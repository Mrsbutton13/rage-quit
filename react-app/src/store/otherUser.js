const SET_USER = 'setUser/otherUser'


const setUser = (otherUser) => ({
  type: SET_USER,
  otherUser
})


export const getOneUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`)
  const data = await res.json()
  dispatch(setUser(data))
  return data
}


function reducer(state={}, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = {}
      newState['otherUser'] = action.otherUser
      return newState
    default:
      return state
  }
}

export default reducer