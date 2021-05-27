const SET_USERS = 'users'


const setUsers = (users) => ({
  type: SET_USERS,
  users
})


export const getUser = () => async (dispatch) => {
  const res = await fetch(`/api/users`)
  const data = await res.json()
  dispatch(setUsers(data.users))
  return res
}

export const getOneUser = () => async (userId) => {
  const res = await fetch(`/api/users/${userId}`)
  const data = await res.json()
  return data
}


function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case SET_USERS:
      newState = {}
      action.users.forEach(user => {
        newState[user.id] = user
      })
      return newState
    default:
      return state
  }
}

export default reducer