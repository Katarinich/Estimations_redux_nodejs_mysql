import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import message from 'reducers/message'
import { routerReducer as routing } from 'react-router-redux'
import * as types from 'types'

const isFetching = ( state = false, action ) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isFetching,
  auth,
  message,
  routing
})

export default rootReducer
