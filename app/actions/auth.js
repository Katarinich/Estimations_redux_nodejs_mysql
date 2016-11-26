import { polyfill } from 'es6-promise'
import request from 'axios'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

import * as types from 'types'

polyfill()

const getMessage = res => res.response && res.response.data && res.response.data.message

function makeUserRequest(method, data, api = '/auth-tokens') {
  return request[method](api, data)
}

export function restoreSignedInUser() {
    return (dispatch, getState) => {
        dispatch({
            type: types.RESTORE_SIGNED_IN_USER_REQUEST
        })

        let auth = getState().auth

        if (!auth.token) {
          return dispatch(logOut())
        }

        let tokenData = null

        try {
          tokenData = jwtDecode(auth.token)
        } catch (e) {
          return dispatch(logOut())
        }

        if(moment.unix(tokenData.expiryDate).isBefore(moment())) {
          return dispatch(logOut())
        }
    }
}


export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER }
}

export function loginSuccess(message, token) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    token
  }
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  }
}

export function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  }
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER }
}

export function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  }
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin())

    return makeUserRequest('post', data, '/auth-tokens')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message, response.data.token))
          dispatch(push('/'))
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

    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message))
          dispatch(push('/'))
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
  return {
    type: types.LOG_OUT
  }
}

export function syncAuth(auth) {
  return {
    type: types.SYNC_AUTH,
    auth
  }
}
