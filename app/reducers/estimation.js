import * as types from 'types'

const initialState = {
  estimations: [],
  estimation: {}
}

const estimation = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ESTIMATIONS_SUCCESS: {
      if (action.data) {
        return {
          ...state,
          estimations: action.data
        }
      }
      return state
    }

    case types.GET_ESTIMATION_SUCCESS: {
      if (action.data) {
        return {
          ...state,
          estimation: action.data
        }
      }
      return state
    }

    case types.UPDATE_BLOCK_SUCCESS: {
      const blockIndex = state.estimation.blocks.findIndex(b => b.id === action.payload.id)

      const newBlocks = [...state.estimation.blocks]
      newBlocks[blockIndex] = { ...action.payload }

      return {
        estimation: {
          ...state.estimation,
          blocks: newBlocks
        }
      }
    }

    default: {
      return state
    }
  }
}

export default estimation
