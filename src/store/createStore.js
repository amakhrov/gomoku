import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const makeRootReducer = require('./reducers').default
      store.replaceReducer(makeRootReducer())
    })
  }

  return store
}
