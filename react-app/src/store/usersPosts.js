const SET_USERPOST = 'userPosts/setPost'

const setUserPost = (userPosts) => ({
  type: SET_USERPOST,
  userPosts
})

export const getUserPost = (userId) => async(dispatch) => {
  const res = await fetch(`/api/posts/${userId}`)
  const data = await res.json()
  dispatch(setUserPost(data.userPosts))
}


function reducer(state ={}, action) {
  let newState;
  switch(action.type) {
    case SET_USERPOST:
      newState ={}
      action.userPosts.forEach(post => {
        newState[post.id] = post
      })
      return newState
    default:
      return state
  }
}

export default reducer