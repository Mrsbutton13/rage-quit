// const SET_USER = 'user'

// const setUser = (user) => ({
//   type: SET_USER,
//   user
// })

// export const authenticate = () => async(dispatch) => {
//   const response = await fetch('/api/auth/',{
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const data = await response.json()
//   await dispatch(setUser(data))
//   return data
// }

// export const login = async (email, password) => {
//   const response = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email,
//       password
//     })
//   });
//   return await response.json();
// }


// export const logout = async () => {
//   const response = await fetch("/api/auth/logout", {
//     headers: {
//       "Content-Type": "application/json",
//     }
//   });
//   return await response.json();
// };

// function reducer(state = {}, action) {
//   let newState;
//   switch (action.type) {
//     case SET_USER:
//       newState = action;
//       return newState
//     default:
//     return state
//   }
// }

// export const signUp = async (user) => {
//   const {username, email, bio, avatar, gamertag, password } = user
//   const formData = new FormData()
//   formData.append('username', username)
//   formData.append('email', email)
//   formData.append('bio', bio)
//   formData.append('gamertag', gamertag)
//   formData.append('password', password)
//   if(avatar) formData.append('avatar', avatar)

//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     body: formData,
//   });
  
//   if(response.ok) {
//     const data = await response.json()
//     return data
//   }
//   else {
//     console.log('Uh oh something went wrong.', response)
//   }
// }


// export default reducer