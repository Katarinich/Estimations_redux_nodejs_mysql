import * as types from '../constants/actionTypes'

const initialState = {
  isFetching: false
}

export default function estimation(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case types.GET_ESTIMATIONS_REQUEST:
    case types.CREATE_ESTIMATION_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case types.GET_ESTIMATIONS_SUCCESS:
      return {
        estimations: JSON.parse(action.payload),
        isFetching: false
      }

    case types.CREATE_ESTIMATION_SUCCESS:
    case types.GET_ESTIMATIONS_FAILURE:
    case types.CREATE_ESTIMATION_FAILURE:
    default:
      return state
  }
}
