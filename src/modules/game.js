import {SYMBOL_X, SYMBOL_O} from './game/constants'
import helpers from './game/rows-helpers'
import getWinningCells from './game/winner'

export const SELECT_CELL = 'SELECT_CELL'
export const GAME_START = 'GAME_START'

export function selectCell (row, column) {
  return {
    type    : SELECT_CELL,
    payload : {row, column}
  }
}


export function start () {
  return {
    type: GAME_START
  }
}


export const actions = {
  selectCell,
  start
}

const ACTION_HANDLERS = {
  [SELECT_CELL]: (state, action) => {
    let {row, column} = action.payload
    let {rows} = state
    if (!helpers.isCellEmpty(rows, row, column)) return state

    let currentSymbol = state.players[state.activePlayer].symbol
    rows = helpers.setCell(rows, row, column, currentSymbol)
    let activePlayer = (state.activePlayer + 1) % state.players.length
    let winningCells = getWinningCells(rows, state.lineSizeToWin, row, column)

    return {...state, rows, activePlayer, winningCells}
  },

  [GAME_START]: (state, action) => resetGame(state, state.rows.length)
}

const defaultFieldSize = 20
export const initialState = resetGame({
  players: [
    {name: 'Pasha', symbol: SYMBOL_X},
    {name: 'Anti', symbol: SYMBOL_O},
  ],
  lineSizeToWin: 5,
}, defaultFieldSize)

function resetGame(state, fieldSize) {
  return {
    ...state,
    rows: helpers.createRows(fieldSize),
    activePlayer: 0,
    winningCells: null
  }
}

export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
