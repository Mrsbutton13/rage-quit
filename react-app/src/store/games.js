const SET_GAME = 'game/setGame'
const SET_TOPGAME = 'topGame/setTopGame'

const setGame = (game) => ({
  type: SET_GAME,
  game
})

const setTopGame = (topGame) => ({
  type: SET_TOPGAME,
  topGame
})


export const getTopGames = () => async(dispatch) => {
  const res = await fetch('api/games/top')
  const data = await res.json()
  dispatch(setTopGame(data.topGame))
  return res
}

export const getGames = () => async(dispatch) => {
  const res = await fetch('api/games')
  const data = await res.json()
  dispatch(setGame(data.game))
  return res
}


function reducer(state ={}, action) {
  let newState;
  switch (action.type) {
    case SET_GAME:
     newState = {};
     action.game.forEach(item => {
       newState[item.id] = item
     });
     return newState
    case SET_TOPGAME:
      newState ={}
      action.topGame.forEach(item => {
        newState[item.id] = item
      })
      return newState
    default:
      return state
  }
}

export default reducer