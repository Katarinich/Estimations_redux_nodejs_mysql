import * as types from 'types'

const initialState = {
  editBlock: null,
  editField: null
}

const editData = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EDIT_DATA: {
      if (action.payload) {
        return {
          ...state,
          editBlock: action.payload.blockId,
          editField: action.payload.blockField
        }
      }

      return state
    }

    case types.RESET_EDIT_DATA: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default editData
