import * as types from '../constants/actionTypes'

const initialState = {
  isFetching: false
}

export default function block(state = initialState, action) {
  switch (action.type) {
    case types.GET_BLOCKS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.GET_BLOCKS_SUCCESS:
      return {
        isFetching: false,
        blocks: JSON.parse(action.payload)
      }
    case types.GET_BLOCKS_FAILURE:
    default:
      return state;
  }
}
