import {
  default as createStore
} from 'store/createStore'

describe('(Store) createStore', () => {
  let store

  before(() => {
    store = createStore()
  })

  it('should have default initial state from the reducer', () => {
    expect(store.getState().game).to.be.an('object')
  })
})
