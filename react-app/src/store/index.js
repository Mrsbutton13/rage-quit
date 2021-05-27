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
import userGame from './userGame'

const rootReducer = combineReducers({
  game,
  category,
  users,
  post,
  currentUser,
  gameComment,
  friend,
  postComment,
  userGame
})

const logger = require('redux-logger').default
const composeEnhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, logger))

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore