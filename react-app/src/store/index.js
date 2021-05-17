import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import game from './games'
import topGame from './games'
import genre from './genres'

const rootReducer = combineReducers({
  game,
  topGame,
  genre
})

const logger = require('redux-logger').default
const composeEnhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, logger))

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore