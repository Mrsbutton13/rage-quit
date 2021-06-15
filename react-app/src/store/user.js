const SET_USERS = 'getUser/users'

const setUsers = (users) => ({
  type: SET_USERS,
  users
})

export const getUser = () => async (dispatch) => {
  const res = await fetch(`/api/users`)
  const data = await res.json()
  console.log(data)
  dispatch(setUsers(data.users))
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