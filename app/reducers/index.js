import { combineReducers } from 'redux'
import auth from 'reducers/auth'
import estimation from 'reducers/estimation'
import message from 'reducers/message'
import editData from 'reducers/editData'
import { routerReducer as routing } from 'react-router-redux'
import * as types from 'types'

const isFetching = (state = false, action) => {
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
  routing,
  estimation,
  editData
})

export default rootReducer
