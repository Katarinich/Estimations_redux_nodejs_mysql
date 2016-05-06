import { combineReducers } from 'redux'
import estimations from './estimation'
import block from './block'

export default combineReducers({
  block,
  estimations
})
