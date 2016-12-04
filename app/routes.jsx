import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'containers/App'
import Estimations from 'containers/Estimations'
import LoginOrRegister from 'containers/LoginOrRegister'

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { auth: { authenticated }} = store.getState()
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback()
  }

  const redirectAuth = (nextState, replace, callback) => {
    const { auth: { authenticated }} = store.getState()
    if (authenticated) {
      replace({
        pathname: '/estimations'
      })
    }
    callback()
  }

  return (
    <Route component={App}>
      <Route path="estimations" onEnter={requireAuth}>
        <IndexRoute component={Estimations} />
      </Route>
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  )
}
