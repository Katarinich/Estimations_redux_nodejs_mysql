import { polyfill } from 'es6-promise'
import request from 'axios'
import * as types from 'types'

polyfill()

export function makeEstimationRequest(method, id, data, api = '/api/estimations') {
  return request[method](api + (id ? ('/' + id) : ''), data)
}

function getEstimationsRequest() {
  return {
    type: types.GET_ESTIMATIONS_REQUEST
  }
}

function getEstimationsSuccess(data) {
  return {
    type: types.GET_ESTIMATIONS_SUCCESS,
    data
  }
}

function getEstimationsFailure(data) {
  return {
    type: types.GET_ESTIMATIONS_FAILURE,
    error: data
  }
}

export function getEstimations() {
  return dispatch => {
    console.log('fetch')
    dispatch(getEstimationsRequest())

    return makeEstimationRequest('get', null, null)
      .then(response => {
        if (response.status === 200) {
          dispatch(getEstimationsSuccess(response.data))
        } else {
          dispatch(getEstimationsFailure('Oops! Something went wrong!'))
        }
      })
      .catch(err => {
        dispatch(getEstimationsFailure(err))
      })
  }
}
