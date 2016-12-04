import * as types from 'types'

const initialState = {
  estimations: []
}

const estimation = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ESTIMATIONS_SUCCESS:
      if (action.data) {
        return {
          ...state,
          estimations: action.data
        }
      }
      return state
    default:
      return state
  }
}

export default estimation
