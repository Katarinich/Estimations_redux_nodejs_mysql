import * as types from '../constants/actionTypes'

const initialState = {
  isFetching: false
}

export default function estimations(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case types.GET_ESTIMATIONS_REQUEST:
    case types.CREATE_ESTIMATION_REQUEST:
      return {
        isFetching: true
      }

    case types.GET_ESTIMATIONS_SUCCESS:
      return {
        estimations: JSON.parse(action.payload),
        isFetching: false
      }

    case types.CREATE_ESTIMATION_SUCCESS:
      return {
        estimations: action.payload,
        isFetching: false
      }

    case types.GET_ESTIMATIONS_FAILURE:
    case types.CREATE_ESTIMATION_FAILURE:
    default:
      return state
  }
}
