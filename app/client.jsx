import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from 'routes'
import * as types from 'types'
import configureStore from 'store/configureStore'
import preRenderMiddleware from 'middlewares/preRenderMiddleware'
import { loadInitialState } from 'middlewares/persistenceMiddleware'
import { restoreSignedInUser } from 'actions/auth'

const initialState = loadInitialState()

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store)

function onUpdate() {
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null
    return
  }

  store.dispatch({ type: types.CREATE_REQUEST })
  preRenderMiddleware(this.state)
  .then(data => {
    return store.dispatch({ type: types.REQUEST_SUCCESS, data })
  })
}

render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'))

  store.dispatch(restoreSignedInUser())
