const SET_PCOMMENT = 'postComment/setPComment'
const ADD_PCOMMENT = 'postComment/addPComment'
const REMOVE_PCOMMENT = 'postComment/removePComment'


const setPComment = (postComment) => ({
  type: SET_PCOMMENT,
  postComment
})

const addPComment = (postComment) => ({
  type: ADD_PCOMMENT,
  postComment
})

const removePComment = () => ({
  type: REMOVE_PCOMMENT
})


export const deletePComment = (postCommentId) => async() => {
  await fetch (`/api/postComment/${postCommentId}`, {method: 'DELETE'})
}

export const getPComment = () => async (dispatch) => {
  const res = await fetch('/api/postComment')
  const data = await res.json()
  dispatch(setPComment(data.postComment))
}


export const createPComment = (postComment) => async(dispatch) => {
  const { userId, postId, body } = postComment
  const res = await fetch('/api/postComment', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId, 
      postId,
      body
    })
  })
  if(res.ok) {
    const data = await res.json()
    dispatch(addPComment(data.postComment))
    return data
  }
}

function reducer(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_PCOMMENT:
      newState = {...state}
      newState['postComment'] = action.postComment
      return newState
    case SET_PCOMMENT:
      newState={}
      action.postComment.forEach(c => {
        newState[c.id] = c
      })
      return newState
    case REMOVE_PCOMMENT:
      return {...state, postComment: null}
    default:
      return state
  }
}

export default reducer