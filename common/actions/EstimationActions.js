import * as types from '../constants/actionTypes'
import request from './util/request'

function createEstimationRequest(estimations) {
  return {
    type: types.CREATE_ESTIMATION_REQUEST,
    payload: estimations
  }
}

function createEstimationSuccess(estimations) {
  return {
    type: types.CREATE_ESTIMATION_SUCCESS,
    payload: estimations
  }
}

function createEstimationFailure(err, status) {
  return {
    type: types.CREATE_ESTIMATION_FAILURE,
    err,
    status
  }
}

export function createEstimation(estimation, estimations) {
  return (dispatch) => {
    dispatch(createEstimationRequest(estimations))
    return request('post', { ...estimation }, '/api/estimation')
    .then( () => {
      dispatch(createEstimationSuccess(estimations))
    })
    .catch(err => {
      dispatch(createEstimationFailure(err, err.status))
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