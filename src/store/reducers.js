import { combineReducers } from 'redux'
import gameReducer from '../modules/game'

export default function makeRootReducer () {
  return combineReducers({
    game: gameReducer
  })
}
