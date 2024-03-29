const SET_POST = 'post/setPost'
const ADD_POST = 'posts/addPost'
const REMOVE_POST = 'posts/removePost'


const setPost = (post) => ({
  type: SET_POST,
  post
})

const addPost = (post) => ({
  type: ADD_POST,
  post
})

const removePost = () => ({
  type: REMOVE_POST
})


export const deletePost = (postId) => async() => {
  await fetch (`/api/posts/${postId}`, {method: 'DELETE'})
}

export const getPost = () => async (dispatch) => {
  const res = await fetch('/api/posts')
  const data = await res.json()
  dispatch(setPost(data.post))
}

export const createPost = (post) => async(dispatch) => {
  const { user_Id, body, post_img, post_video, createdOn } = post
  const formData = new FormData()
  formData.append('user_id', user_Id)
  formData.append('body', body)
  formData.append('createdOn', createdOn)
  if(post_video) formData.append('post_video', post_video)
  if(post_img) formData.append('post_img', post_img)
  // const res = await fetch('/api/posts', {
  //   method: 'POST',
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({
  //     user_Id,
  //     body,
  //     post_img,
  //     postVideo,
  //     createdOn
  //   }),
  // });

  const res = await fetch('/api/posts', {
    method: 'POST',
    body: formData,
  })

  if(res.ok) {
    const data = await res.json()
    dispatch(addPost(data.post))
    return data

  }

}



function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_POST:
      newState = {...state}
      newState['post'] = action.post
      return newState
    case SET_POST: 
      newState ={}
      action.post.forEach(item => {
        newState[item.id] = item
      })
      return newState
    case REMOVE_POST:
      return {...state, post: null}
    default:
      return state
  }
}

export default reducer
