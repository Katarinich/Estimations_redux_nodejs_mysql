import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoutes from 'routes'
import * as types from 'types'
import configureStore from 'store/configureStore'

import { restoreSignedInUser } from 'actions/auth'

const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store)

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'))

  store.dispatch(restoreSignedInUser())
