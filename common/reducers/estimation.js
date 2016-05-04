import * as types from '../constants/actionTypes'

export default function estimation(state = {}, action) {
  switch (action.type) {
    case types.CREATE_ESTIMATION_SUCCESS:
    case types.CREATE_ESTIMATION_REQUEST:
    case types.CREATE_ESTIMATION_FAILURE:
    default:
      return state;
  }
}
