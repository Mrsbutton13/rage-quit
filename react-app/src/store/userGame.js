const ADD_UGAME ='userGame/addUserGame'
const SET_UGAME ='userGame/setUserGame'
const REMOVE_UGAME = 'userGame/removeUserGame'


const addUserGame = (userGame) => ({
  type: ADD_UGAME,
  userGame
})

const setUserGame = (userGame) => ({
  type: SET_UGAME,
  userGame
})

const removeUserGame = () => ({
  type: REMOVE_UGAME
})


export const deleteGame = (gameId) => async() => {
  await fetch(`/api/userGames/${gameId}`, {method: 'DELETE'})
}

export const addGame = (userGame) => async(dispatch) => {
  const { userId, gameId } = userGame
  const res = await fetch('/api/userGames', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId,
      gameId
    })
  })
  if(res.ok) {
    const data = await res.json()
    await dispatch(addUserGame(data.userGame))
    return data
  }
}

export const getUserGames = () => async(dispatch) => {
  const res = await fetch('/api/userGames')
  const data = await res.json()
  dispatch(setUserGame(data.userGame))
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_UGAME:
      newState = {...state}
      newState['userGame'] = action.userGame
      return newState
    case SET_UGAME:
      newState = {}
      action.userGame.forEach(game => {
        newState[game.id] = game
      })
      return newState
    case REMOVE_UGAME:
      return {...state, userGame: null}
    default:
      return state
  }
}


export default reducer