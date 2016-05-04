import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import EstimationApp from './containers/EstimationApp'
import configureStore from './store/configureStore'

const store = configureStore()
const dispatch = store.dispatch

render(
  <Provider store={store}>
    <EstimationApp dispatch={dispatch}/>
  </Provider>,
  document.getElementById('root')
)
