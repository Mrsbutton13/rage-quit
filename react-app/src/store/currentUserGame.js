const SET_CURRENT_USER_GAME ='currentUserGame/setUserGame'

const setCurrentUserGame = (currentUserGame) => ({
  type: SET_CURRENT_USER_GAME,
  currentUserGame
})

export const getCurrentUserGames = () => async(dispatch) => {
  const res = await fetch('/api/games/currentUserGames')
  const data = await res.json()
  dispatch(setCurrentUserGame(data.currentUserGame))
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_CURRENT_USER_GAME:
      newState = {}
      action.currentUserGame.forEach(game => {
        newState[game.id] = game
      })
      return newState
    default:
      return state
  }
}


export default reducer