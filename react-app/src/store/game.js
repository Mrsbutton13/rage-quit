const SET_GAME = 'game/setGame'

const setGame = (game) => ({
  type: SET_GAME,
  game,
})

export const getGames = () => async (dispatch) => {
  const res = await fetch('/api/games')
  const data = await res.json()
  dispatch(setGame(data.game))
  return res
}


function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case SET_GAME:
      newState = {}
      action.game.forEach(item => {
        newState[item.id] = item
      })
      return newState
    default:
      return state
  }
}

export default reducer