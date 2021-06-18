const SET_FRIEND = 'currentUsersFriend/setFriend'

const setCurrentFriend = (currentUsersFriend) => ({
  type: SET_FRIEND,
  currentUsersFriend
})


export const getFriend = () => async(dispatch) => {
  const res = await fetch(`/api/friends/currentUser`)
  const data = await res.json()
  dispatch(setCurrentFriend(data.currentUsersFriend))
}


function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_FRIEND:
      newState = {}
      action.currentUsersFriend.forEach(person => {
        newState[person.id] = person
      })
      return newState
    default:
      return state
  }
}


export default reducer