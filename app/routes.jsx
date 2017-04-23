import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'containers/App'
import Estimations from 'containers/Estimations'
import Estimation from 'containers/Estimation'
import LoginOrRegister from 'containers/LoginOrRegister'
import Main from 'containers/Main'

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
      <Route component={Main}>
        <Route path="estimations" onEnter={requireAuth} component={Estimations} />
        <Route path="estimations/:estimationId" component={Estimation} />
      </Route>
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    </Route>
  )
}
