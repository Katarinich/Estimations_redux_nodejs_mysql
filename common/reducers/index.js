import { combineReducers } from 'redux'
import estimation from './estimation'
import block from './block'

export default combineReducers({
  block,
  estimation
})
