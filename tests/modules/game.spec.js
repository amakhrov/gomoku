import {
  selectCell,
  default as gameReducer
} from 'modules/game'

import {SYMBOL_X, SYMBOL_O} from 'modules/game/constants'
import helpers from 'modules/game/rows-helpers'

describe('(Redux Module) Game', () => {
  describe('(Reducer) Game', () => {
    it('Should be a function.', () => {
      expect(gameReducer).to.be.a('function')
    })

    it('Should initialize with an empty field', () => {
      let state = gameReducer(undefined, {})

      expect(state.rows.length).to.equal(20)
      expect(state.rows[0].length).to.equal(20)
    })
  })

  describe('(Reducer) SELECT_CELL', () => {
    let state

    beforeEach(() => {
      state = gameReducer(undefined, {})
    })

    it('Should not modify state if the cell is already occupied', () => {
      state = {...state, rows: helpers.setCell(state.rows, 0, 0, SYMBOL_X)}

      let newState = gameReducer(state, selectCell(0, 0))
      expect(newState).to.equal(state)
    })

    it('Should put the symbol to the cell', () => {
      let newState = gameReducer(state, selectCell(1, 2))
      expect(newState.rows[1][2]).to.equal(SYMBOL_X)
    })

    it('Should use the symbol from the current player', () => {
      state = {...state, activePlayer: 1}
      let newState = gameReducer(state, selectCell(1, 2))
      expect(newState.rows[1][2]).to.equal(SYMBOL_O)
    })

    it('Should switch activePlayer to 1 after player 0 made a turn', () => {
      let newState = gameReducer(state, selectCell(1, 2))
      expect(newState.activePlayer).to.equal(1)
    })

    it('Should switch activePlayer to 0 after player 1 made a turn', () => {
      state = {...state, activePlayer: 1}
      let newState = gameReducer(state, selectCell(1, 2))
      expect(newState.activePlayer).to.equal(0)
    })

    it('Should mark the winning like after a winning turn', () => {
      let rows = helpers.createRows(3)
      rows = helpers.setCell(rows, 0, 0, SYMBOL_X)
      state = {...state, rows, lineSizeToWin: 2}
      let newState = gameReducer(state, selectCell(1, 1))
      expect(newState.winningCells).to.deep.equal([ [0, 0], [1, 1] ])
    })

    it('Should not modify state if the game is over', () => {
      state = {...state, winningCells: [ [1,1] ]}

      let newState = gameReducer(state, selectCell(0, 0))
      expect(newState).to.equal(state)
    })
  })
})
