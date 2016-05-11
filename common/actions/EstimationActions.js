import * as types from '../constants/actionTypes'
import request from './util/request'
import {createBlocks} from './BlockActions'

function createEstimationRequest(estimations) {
  return {
    type: types.CREATE_ESTIMATION_REQUEST,
    payload: estimations
  }
}

export function createEstimationSuccess() {
  return {
    type: types.CREATE_ESTIMATION_SUCCESS
  }
}

function createEstimationFailure(err, status, estimations) {
  return {
    type: types.CREATE_ESTIMATION_FAILURE,
    err,
    status,
    payload: estimations
  }
}

export function createEstimation(estimation, estimations) {
  return (dispatch) => {
    dispatch(createEstimationRequest(estimations))
    return request('post', { ...estimation }, '/api/estimation')
    .then( (insertedEstimation) => {
      dispatch(createBlocks(insertedEstimation, estimations))
      dispatch(createEstimationSuccess())
    })
    .catch(err => {
      dispatch(createEstimationFailure(err, err.status, estimations))
    })
  }
}

function getEstimationsRequest() {
  return {
    type: types.GET_ESTIMATIONS_REQUEST
  }
}

function getEstimationsSuccess(res) {
  return {
    type: types.GET_ESTIMATIONS_SUCCESS,
    payload: res
  }
}

function getEstimationsFailure(err, status) {
  return {
    type: types.GET_ESTIMATIONS_FAILURE,
    err,
    status
  }
}

export function getEstimations() {
  return (dispatch) => {
    dispatch(getEstimationsRequest())
    return request('get', {}, '/api/estimations')
    .then(res => {
      dispatch(getEstimationsSuccess(res))
    })
    .catch(err => {
      dispatch(getEstimationsFailure(err, err.status))
    })
  }
}
