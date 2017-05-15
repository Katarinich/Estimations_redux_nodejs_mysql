import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import promiseMiddleware from 'middlewares/promiseMiddleware'
import { persistChanges, bindStoreToStorageUpdates } from 'middlewares/persistenceMiddleware'
import createLogger from 'redux-logger'

export default function configureStore(initialState, history) {
  const middleware = [thunk, promiseMiddleware, persistChanges, routerMiddleware(history)]
  let store

  if (__DEVCLIENT__) {
    middleware.push(createLogger())
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ))
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f))
  }

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers')
      
      store.replaceReducer(nextReducer)
    })
  }

  bindStoreToStorageUpdates(store)

  return store
}
