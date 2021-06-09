const SET_GCOMMENT = 'comment/setGComment'
const ADD_GCOMMENT = 'comment/addGComment'
const REMOVE_GCOMMENT = 'comment/removeGComment'


const setGComment = (comment) => ({
  type: SET_GCOMMENT,
  comment
})

const addGComment = (comment) => ({
  type: ADD_GCOMMENT,
  comment
})


const removeGComment = () => ({
  type: REMOVE_GCOMMENT
})


export const deleteGComment = (commentId) => async() => {
  await fetch (`/api/games/comments/${commentId}`, {method: 'DELETE'})
}


export const getGComment = () => async (dispatch) => {
  const res = await fetch('/api/games/comments')
  const data = await res.json()
  dispatch(setGComment(data.comment))
}


export const createGComment = (comment) => async(dispatch) => {
  const { userId, gameId, body } = comment
  const res = await fetch('/api/games/comments', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      gameId,
      body
    })
  })
  if(res.ok){
    const data = await res.json()
    dispatch(addGComment(data.comment))
    return data
  }
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_GCOMMENT:
      newState = {...state}
      newState['comment'] = action.comment
      return newState
    case SET_GCOMMENT:
      newState = {}
      action.comment.forEach(c => {
        newState[c.id] = c
      })
      return newState
    case REMOVE_GCOMMENT:
      return {...state, comment: null}
    default:
      return state
  }
}

export default reducer