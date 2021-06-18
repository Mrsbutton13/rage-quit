import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import game from './game'
import category from './category'
import users from './user'
import post from './post'
import currentUser from './currentUser'
import gameComment from './gameComment'
import friend from './friend'
import postComment from './postComment'
import currentUserGame from './currentUserGame'
import userFriend from './userFriend'
import otherUser from './otherUser'
import currentUsersFriend from './currentUserFriend'
import joinsIds from './userGames'
import otherUserGame from './otherUserGames'

const rootReducer = combineReducers({
  game,
  category,
  users,
  post,
  gameComment,
  friend,
  postComment,
  currentUser,
  currentUserGame,
  currentUsersFriend,
  otherUser,
  otherUserGame,
  userFriend,
  joinsIds
})

// const logger = require('redux-logger').default
const composeEnhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore