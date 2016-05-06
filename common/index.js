import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import EstimationApp from './containers/EstimationApp'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <EstimationApp />
  </Provider>,
  document.getElementById('root')
)
