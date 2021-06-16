const SET_OTHER_USER_GAME ='otherUserGame/setOtherUserGame'

const setOtherUserGame = (otherUserGame) => ({
  type: SET_OTHER_USER_GAME,
  otherUserGame
})

export const getOtherUserGame = (userId) => async(dispatch) => {
  const res = await fetch(`/api/games/${userId}`)
  const data = await res.json()
  console.log(data)
  dispatch(setOtherUserGame(data.otherUserGame))
}

function reducer(state= {}, aciton) {
  let newState;
  switch(aciton.type) {
    case SET_OTHER_USER_GAME:
      newState = {}
      aciton.otherUserGame.forEach(game => {
        newState[game.id] = game
      })
      return newState
    default:
      return state
  }
}

export default reducer