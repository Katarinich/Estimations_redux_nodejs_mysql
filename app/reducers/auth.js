import * as types from 'types'

const initialState = {
    token: null,
    userId: null,
    email: null,
    isWaiting: false,
    authenticated: false,
    message: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
      return {
        ...state,
        message: '',
        isWaiting: true
      }
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.RESTORE_SIGNED_IN_USER:
      return {
        message: '',
        isWaiting: false,
        authenticated: true,
        token: action.token,
        userId: action.userId,
        email: action.email
      }
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return {
        message: action.message,
        isWaiting: false,
        authenticated: false,
        token: null,
        userId: null,
        email: null
      }
    case types.SYNC_AUTH: {
      const authData = action.auth || {}

      return {
        ...state,
        ...authData
      }
    }
    case types.LOG_OUT:
      return initialState
    default:
      return state
  }
}

export default auth
