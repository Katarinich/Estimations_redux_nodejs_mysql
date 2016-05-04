import * as types from '../constants/actionTypes'
import request from './util/request'

function createEstimationRequest(estimation) {
  return {
    type: types.CREATE_ESTIMATION_REQUEST,
    estimation
  }
}

function createEstimationSuccess(estimation) {
  return {
    type: types.CREATE_ESTIMATION_SUCCESS,
    estimation
  }
}

function createEstimationFailure(err, status) {
  return {
    type: types.CREATE_ESTIMATION_FAILURE,
    err,
    status
  }
}

export function createEstimation(estimation) {
  return (dispatch) => {
    dispatch(createEstimationRequest(estimation))
    return request('post', { ...estimation }, '/api/estimation')
    .then(estimation => {
      dispatch(createEstimationSuccess(estimation))
    })
    .catch(err => {
      dispatch(createEstimationFailure(err, err.status))
    })
  }
}
