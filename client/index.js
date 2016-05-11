import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import configureStore from '../common/store/configureStore'
import { routes } from '../common/routes'
import startSocketListener from './socketListener'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

startSocketListener(store.dispatch)
