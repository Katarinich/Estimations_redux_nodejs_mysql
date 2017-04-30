import { polyfill } from 'es6-promise'
import * as types from 'types'

polyfill()

export function setEditData(blockId, blockField) {
  return {
    type: types.SET_EDIT_DATA,
    payload: {
      blockId,
      blockField
    }
  }
}

export function resetEditData() {
  return {
    type: types.RESET_EDIT_DATA
  }
}
