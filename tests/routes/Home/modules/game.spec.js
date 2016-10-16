import {
  SELECT_CELL,
  default as gameReducer
} from 'routes/Game/modules/game'

describe('(Redux Module) Game', () => {
  describe('(Reducer) SELECT_CELL', () => {
    it('Should be a function.', () => {
      expect(gameReducer).to.be.a('function')
    })

    it('Should initialize with an empty field', () => {
      let state = gameReducer(undefined, {})

      expect(state.field.rows.length).to.equal(20)
      expect(state.field.rows[0].length).to.equal(20)
    })

  })
})
