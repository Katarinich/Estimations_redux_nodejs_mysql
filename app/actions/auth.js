import { polyfill } from 'es6-promise'
import request from 'axios'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import { loadInitialState } from 'middlewares/persistenceMiddleware'

import * as types from 'types'

polyfill()

const getMessage = res => res.response && res.response.data && res.response.data.message

function makeUserRequest(method, data, api = '/api/auth-tokens') {
  return request[method](api, data)
}

export function restoreSignedInUser() {
    return (dispatch, getState) => {
        let auth = loadInitialState().auth

        if (!auth.token) {
          return dispatch(logOut())
        }

        let tokenData = null

        try {
          tokenData = jwtDecode(auth.token)
        } catch (e) {
          return dispatch(logOut())
        }

        if(moment.unix(tokenData.exp).isBefore(moment())) {
          return dispatch(logOut())
        }

        dispatch({
            type: types.RESTORE_SIGNED_IN_USER,
            token: auth.token,
            userId: tokenData.data.userId,
            email: tokenData.data.email
        })
    }
}


function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER }
}

function loginSuccess(message, token) {
  const tokenData = jwtDecode(token)
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    token,
    userId: tokenData.data.userId,
    email: tokenData.data.email
  }
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  }
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  }
}

function beginSignUp() {
  return { type: types.SIGNUP_USER }
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  }
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin())

    return makeUserRequest('post', data, '/api/auth-tokens')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message, response.data.token))
          dispatch(push('/estimations'))
        } else {
          dispatch(loginError('Oops! Something went wrong!'))
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)))
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp())

    return makeUserRequest('post', data, '/api/users')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message))
          dispatch(push('/estimations'))
        } else {
          dispatch(signUpError('Oops! Something went wrong'))
        }
      })
      .catch(err => {
        dispatch(signUpError(getMessage(err)))
      })
  }
}

export function logOut() {
  return dispatch => {
    dispatch(push('/login'))

    dispatch({
      type: types.LOG_OUT
    })
  }
}

export function syncAuth(auth) {
  return {
    type: types.SYNC_AUTH,
    auth
  }
}
