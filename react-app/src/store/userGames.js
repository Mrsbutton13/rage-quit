const ADD_UGAME ='joinsIds/addUserGame'
const SET_UGAME ='joinsIds/setUserGame'
const REMOVE_UGAME = 'joinsIds/removeUserGame'


const addUserGame = (joinsIds) => ({
  type: ADD_UGAME,
  joinsIds
})

const setUserGame = (joinsIds) => ({
  type: SET_UGAME,
  joinsIds
})

const removeUserGame = () => ({
  type: REMOVE_UGAME
})


export const deleteGame = (gameId) => async() => {
  await fetch(`/api/games/userGames/${gameId}`, {method: 'DELETE'})
}

export const addGame = (userGame) => async(dispatch) => {
  const { userId, gameId } = userGame
  const res = await fetch('/api/games/userGames', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      gameId
    })
  })
  if(res.ok) {
    const data = await res.json()
    await dispatch(addUserGame(data.joinsIds))
    return data
  }
}

export const getUserGames = (userId) => async(dispatch) => {
  const res = await fetch(`/api/games/userGames/${userId}`)
  const data = await res.json()
  dispatch(setUserGame(data.joinsIds))
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_UGAME:
      newState = {...state}
      newState['joinsIds'] = action.joinsIds
      return newState
    case SET_UGAME:
      newState = {}
      action.joinsIds.forEach(game => {
        newState[game.id] = game
      })
      return newState
    case REMOVE_UGAME:
      return {...state, joinsIds: null}
    default:
      return state
  }
}


export default reducer