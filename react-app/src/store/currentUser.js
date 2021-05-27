const SET_USER = 'user'
const LOGIN = 'login/user'
const LOGOUT = 'logout/user'

const setUser = (user) => ({
  type: SET_USER,
  user
})


const logoutUser = () => {
  return {
    type: LOGOUT
  }
}

export const setCurrentUser = () => async (dispatch) => {
  const res = await fetch('/api/auth/')
  const user = await res.json()
  if(!user.errors) {
    dispatch(setUser(user))
  }
}

export const login = (user) => async(dispatch) => {
  const { email, password } = user
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email,
      password
    })
  });
  if(response.ok) {
    const data = await response.json()
    await dispatch(setUser(data.user))
    return data
  } 

}

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout");
  dispatch(logoutUser())
  return response
};

const initialState = { user: null }

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = {}
      newState['user'] = action.user
      return newState
    case LOGIN:
      newState = {}
      newState['user'] = action.user
      return newState
    case LOGOUT:
      newState = {}
      newState['user'] = null
      return newState
    default:
      return state
  }
}

export const signUp = (user) => async (dispatch) => {
  const {username, email, bio, avatar, gamertag, password } = user
  const formData = new FormData()
  formData.append('username', username)
  formData.append('email', email)
  formData.append('bio', bio)
  formData.append('gamertag', gamertag)
  formData.append('password', password)
  if(avatar) formData.append('avatar', avatar)

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });
  
 if(response.ok) {
    const data = await response.json()
    dispatch(setUser(data.user))
    return data
  }
  else {
    console.log('Uh oh something went wrong.', response)
  }
}


export default reducer