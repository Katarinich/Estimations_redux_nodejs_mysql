import { polyfill } from 'es6-promise'
import axios from 'axios'
import * as types from 'types'

polyfill()

export function makeEstimationRequest(method, url, data, token) {
  const instance = axios.create({
    baseURL: '/',
    timeout: 1000,
    headers: { 'x-access-token': token }
  })

  return instance[method](url, data)
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

    return makeEstimationRequest('get', `/api/users/${userId}/estimations`, null, token)
      .then(response => {
        if (response.status === 200) {
          return dispatch(getEstimationsSuccess(response.data))
        }

        return dispatch(getEstimationsFailure('Oops! Something went wrong!'))
      })
      .catch(err => {
        return dispatch(getEstimationsFailure(err))
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

    const { token } = getState().auth

    return makeEstimationRequest('get', `/api/estimations/${estimationId}`, null, token)
      .then(response => {
        if (response.status === 200) {
          return dispatch(getEstimationSuccess(response.data))
        }

        return dispatch(getEstimationFailure('Oops! Something went wrong!'))
      })
      .catch(err => {
        return dispatch(getEstimationFailure(err))
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
    let d = new Date().getTime()

    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now()
    }

    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + (Math.random() * 16)) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16)
    })

    const { userId, token } = getState().auth

    const data = {
      id
    }

    dispatch(createEstimationRequest())

    return makeEstimationRequest('post', `/api/users/${userId}/estimations`, data, token)
      .then(() => {
        dispatch(getEstimations())
        return dispatch(createEstimationSuccess())
      })
      .catch(() => {
        return dispatch(createEstimationFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your ESTIMATION'}))
      })
  }
}

function deleteEstimationRequest() {
  return {
    type: types.DELETE_ESTIMATION_REQUEST
  }
}

function deleteEstimationSuccess() {
  return {
    type: types.DELETE_ESTIMATION_SUCCESS
  }
}

function deleteEstimationFailure(error) {
  return {
    type: types.DELETE_ESTIMATION_FAILURE,
    error
  }
}

export function deleteEstimation(estimationId) {
  return (dispatch, getState) => {
    const { token } = getState().auth

    dispatch(deleteEstimationRequest())

    return makeEstimationRequest('delete', `/api/estimations/${estimationId}`, null, token)
      .then(() => {
        dispatch(getEstimations())
        return dispatch(deleteEstimationSuccess())
      })
      .catch(() => {
        return dispatch(deleteEstimationFailure({ estimationId, error: 'Oops! Something went wrong and we couldn\'t delete your ESTIMATION'}))
      })
  }
}

function updateEstimationBlockRequest() {
  return {
    type: types.UPDATE_BLOCK_REQUEST
  }
}

function updateEstimationBlockSuccess(blockData) {
  return {
    type: types.UPDATE_BLOCK_SUCCESS,
    payload: blockData
  }
}

function updateEstimationBlockFailure(error) {
  return {
    type: types.UPDATE_BLOCK_FAILURE,
    error
  }
}

export function updateEstimationBlock(blockId, estimationId, blockData) {
  return (dispatch, getState) => {
    const { token } = getState().auth

    dispatch(updateEstimationBlockRequest())

    return makeEstimationRequest('put', `/api/estimations/${estimationId}/blocks/${blockId}`, blockData, token)
      .then(() => {
        return dispatch(updateEstimationBlockSuccess(blockData))
      })
      .catch(() => {
        return dispatch(updateEstimationBlockFailure({ blockId, error: 'Oops! Something went wrong and we couldn\'t update your BLOCK'}))
      })
  }
}

function addEstimationBlockRequest() {
  return {
    type: types.ADD_BLOCK_REQUEST
  }
}

function addEstimationBlockSuccess(blockId, blockData) {
  return {
    type: types.ADD_BLOCK_SUCCESS,
    payload: {
      id: blockId,
      ...blockData
    }
  }
}

function addEstimationBlockFailure(error) {
  return {
    type: types.ADD_BLOCK_FAILURE,
    error
  }
}

export function addEstimationBlock(estimationId, blockData) {
  return (dispatch, getState) => {
    const { token } = getState().auth

    dispatch(addEstimationBlockRequest())

    return makeEstimationRequest('post', `/api/estimations/${estimationId}/blocks`, blockData, token)
      .then((result) => {
        dispatch(addEstimationBlockSuccess(result.data, blockData))
        return result.data
      })
      .catch(() => {
        return dispatch(addEstimationBlockFailure({ error: 'Oops! Something went wrong and we couldn\'t add your BLOCK'}))
      })
  }
}
