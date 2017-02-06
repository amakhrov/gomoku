import undoable, {ActionCreators as HistoryActions} from 'redux-undo'
import {SYMBOL_X, SYMBOL_O} from './game/constants'
import helpers from './game/rows-helpers'
import getWinningCells from './game/winner'

export const SELECT_CELL = 'SELECT_CELL'
export const GAME_START = 'GAME_START'
export const CHANGE_FIELD_SIZE = 'CHANGE_FIELD_SIZE'

export function selectCell (row, column) {
  return {
    type    : SELECT_CELL,
    payload : {row, column}
  }
}

export function start () {
  return dispatch => {
    dispatch({type: GAME_START})
    dispatch(HistoryActions.clearHistory())
  }
}

export function changeFieldSize (fieldSize) {
  return {
    type: CHANGE_FIELD_SIZE,
    payload: {fieldSize}
  }
}

export const actions = {
  selectCell,
  start,
  changeFieldSize
}

const ACTION_HANDLERS = {
  [SELECT_CELL]: (state, action) => {
    if (state.winningCells) return state

    let {row, column} = action.payload
    let {rows} = state
    if (!helpers.isCellEmpty(rows, row, column)) return state

    let currentSymbol = state.players[state.activePlayer].symbol
    rows = helpers.setCell(rows, row, column, currentSymbol)

    let winningCells = getWinningCells(rows, state.lineSizeToWin, row, column)
    let isGameOver = !!winningCells
    let winningPlayer = isGameOver ? state.activePlayer : null
    let activePlayer = isGameOver ? state.activePlayer : (state.activePlayer + 1) % state.players.length

    return {...state, rows, activePlayer, winningCells, winningPlayer}
  },

  [GAME_START]: (state, action) => resetGame(state),

  [CHANGE_FIELD_SIZE]: (state, {payload: {fieldSize}}) => ({...state, fieldSize})
}

export const initialState = resetGame({
  players: [
    {name: 'Player 1', symbol: SYMBOL_X},
    {name: 'Player 2', symbol: SYMBOL_O},
  ],
  fieldSize: 20,
  lineSizeToWin: 5,
})

function resetGame (state) {
  return {
    ...state,
    rows: helpers.createRows(state.fieldSize),
    activePlayer: 0,
    winningCells: null
  }
}

export function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default undoable(gameReducer, {
  debug: true
})
