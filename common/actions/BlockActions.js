import * as types from '../constants/actionTypes'
import request from './util/request'

export function getInput(isInput) {
  return {
    type: types.GET_INPUT,
    payload: ! isInput
  }
}

export function createBlocks(insertedEstimation, estimations) {
  return (dispatch) => {
    dispatch(createBlocksRequest())
    return request('post', { ...insertedEstimation }, '/api/blocks')
    .then( () => {
      dispatch(createBlocksSuccess(estimations))
    })
    .catch(err => {
      dispatch(createBlocksFailure(err, err.status))
    })
  }
}

function createBlocksRequest() {
  return {
    type: types.CREATE_BLOCKS_REQUEST
  }
}

function createBlocksSuccess(estimations){
  return {
    type: types.CREATE_BLOCKS_SUCCESS,
    payload: estimations
  }
}

function createBlocksFailure() {
  return {
    type: types.CREATE_BLOCKS_FAILURE
  }
}
