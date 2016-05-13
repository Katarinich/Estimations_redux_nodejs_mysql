import * as types from '../constants/actionTypes'
import request from './util/request'

export function getInput(isInput) {
  return {
    type: types.GET_INPUT,
    payload: ! isInput
  }
}

export function createBlocks(insertedEstimation) {
  return (dispatch) => {
    dispatch(createBlocksRequest())
    return request('post', { ...insertedEstimation }, '/api/blocks')
    .then( () => {
      dispatch(createBlocksSuccess())
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

function createBlocksSuccess(){
  return {
    type: types.CREATE_BLOCKS_SUCCESS
  }
}

function createBlocksFailure() {
  return {
    type: types.CREATE_BLOCKS_FAILURE
  }
}

function getBlocksRequest() {
  return {
    type: types.GET_BLOCKS_REQUEST
  }
}

function getBlocksSuccess(res) {
  return {
    type: types.GET_BLOCKS_SUCCESS,
    payload: res
  }
}

function getBlocksFailure(err, status) {
  return {
    type: types.GET_BLOCKS_FAILURE,
    err,
    status
  }
}

export function getBlocks(estimation) {
  return (dispatch) => {
    dispatch(getBlocksRequest())
    return request('get', {}, '/api/blocks/' + estimation.id)
    .then(res => {
      dispatch(getBlocksSuccess(res))
    })
    .catch(err => {
      dispatch(getBlocksFailure(err, err.status))
    })
  }
}
