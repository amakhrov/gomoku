import {
  selectCell,
  changeFieldSize,
  start,
  gameReducer,
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
      state = {
        ...state,
        players: [{symbol: SYMBOL_X}, {symbol: SYMBOL_O}]
      }
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

    it('Should not modify state after the game is over', () => {
      state = {...state, winningCells: [ [1, 1] ]}

      let newState = gameReducer(state, selectCell(0, 0))
      expect(newState).to.equal(state)
    })
  })

  describe('(Reducer) CHANGE_FIELD_SIZE', () => {
    it('Should change the field size in the state', () => {
      let state = {
        fieldSize: 3,
        rows: helpers.createRows(3)
      }

      let newState = gameReducer(state, changeFieldSize(5))
      expect(newState.fieldSize).to.equal(5)
    })
  })

  describe('(Reducer) RESET', () => {
    it('Should reset the rows using the current field size', () => {
      let state = {
        fieldSize: 5,
        rows: helpers.createRows(3)
      }

      // emulate redux-thunk handler
      let dispatch = action => {
        state = gameReducer(state, action)
      }
      start()(dispatch)

      expect(state.rows.length).to.equal(5)
    })
  })

  describe('(Reducer) Winning move', () => {
    let state

    beforeEach(() => {
      state = gameReducer(undefined, {})
      let players = [{symbol: SYMBOL_X}, {symbol: SYMBOL_O}]
      let rows = helpers.createRows(3)
      rows = helpers.setCell(rows, 0, 0, SYMBOL_X)
      state = {...state, players, rows, lineSizeToWin: 2}
    })

    it('Should mark the winning line', () => {
      let newState = gameReducer(state, selectCell(1, 1))
      expect(newState.winningCells).to.deep.equal([ [0, 0], [1, 1] ])
    })

    it('Should mark the winner player', () => {
      let newState = gameReducer(state, selectCell(1, 1))
      expect(newState.winningPlayer).to.equal(0)
    })
  })
})
