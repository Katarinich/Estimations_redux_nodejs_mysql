import { polyfill } from 'es6-promise'
import axios from 'axios'
import * as types from 'types'

polyfill()

export function makeEstimationRequest(method, id, data, userId, token) {
  var instance = axios.create({
    baseURL: '/',
    timeout: 1000,
    headers: { 'x-access-token': token }
  })

  return instance[method](`/api/users/${userId}/estimations` + (id ? ('/' + id) : ''), data)
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
  return (dispatch, getState) => {
    dispatch(getEstimationsRequest())

    const { token, userId } = getState().auth

    return makeEstimationRequest('get', null, null, userId, token)
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

function getEstimationRequest() {
  return {
    type: types.GET_ESTIMATION_REQUEST
  }
}

function getEstimationSuccess(data) {
  return {
    type: types.GET_ESTIMATION_SUCCESS,
    data
  }
}

function getEstimationFailure(data) {
  return {
    type: types.GET_ESTIMATION_FAILURE,
    error: data
  }
}

export function getEstimation(estimationId) {
  return (dispatch, getState) => {
    dispatch(getEstimationRequest())

    const { token, userId } = getState().auth

    return makeEstimationRequest('get', estimationId, null, userId, token)
      .then(response => {
        if (response.status === 200) {
          dispatch(getEstimationSuccess(response.data))
        } else {
          dispatch(getEstimationFailure('Oops! Something went wrong!'))
        }
      })
      .catch(err => {
        dispatch(getEstimationFailure(err))
      })
  }
}

function createEstimationRequest() {
  return {
    type: types.CREATE_ESTIMATION_REQUEST
  }
}

function createEstimationSuccess() {
  return {
    type: types.CREATE_ESTIMATION_SUCCESS
  }
}

function createEstimationFailure(error) {
  return {
    type: types.CREATE_ESTIMATION_FAILURE,
    error
  }
}

export function createEstimation() {
  return (dispatch, getState) => {
    var d = new Date().getTime()

    if(window.performance && typeof window.performance.now === 'function') {
        d += performance.now()
    }

    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d/16)
        return (c === 'x' ? r : (r&0x3|0x8)).toString(16)
    })

    const { userId, token } = getState().auth

    const data = {
      id
    }

    dispatch(createEstimationRequest());

    return makeEstimationRequest('post', null, data, userId, token)
      .then(res => {
        if (res.status === 200) {
          dispatch(getEstimations())
          return dispatch(createEstimationSuccess())
        }
      })
      .catch(() => {
        return dispatch(createEstimationFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your ESTIMATION'}))
      })
  }
}
