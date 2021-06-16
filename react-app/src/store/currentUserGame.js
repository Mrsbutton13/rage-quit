const ADD_UGAME ='currentUserGame/addUserGame'
const SET_UGAME ='currentUserGame/setUserGame'
const REMOVE_UGAME = 'currentUserGame/removeUserGame'


const addUserGame = (currentUserGame) => ({
  type: ADD_UGAME,
  currentUserGame
})

const setUserGame = (currentUserGame) => ({
  type: SET_UGAME,
  currentUserGame
})

const removeUserGame = () => ({
  type: REMOVE_UGAME
})


export const deleteGame = (gameId) => async() => {
  await fetch(`/api/games/userGames/${gameId}`, {method: 'DELETE'})
}

export const addGame = (currentUserGame) => async(dispatch) => {
  const { userId, gameId } = currentUserGame
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
    await dispatch(addUserGame(data.currentUserGame))
    return data
  }
}

export const getUserGames = () => async(dispatch) => {
  const res = await fetch('/api/games/userGames')
  const data = await res.json()
  dispatch(setUserGame(data.currentUserGame))
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_UGAME:
      newState = {...state}
      newState['currentUserGame'] = action.currentUserGame
      return newState
    case SET_UGAME:
      newState = {}
      action.currentUserGame.forEach(game => {
        newState[game.id] = game
      })
      return newState
    case REMOVE_UGAME:
      return {...state, currentUserGame: null}
    default:
      return state
  }
}


export default reducer