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
    type    : GAME_START
  }
}


export const actions = {
  selectCell,
  start
}


function createEmptyRows(size) {
  let rows = [];
  for (let i=0; i<size; i++) {
    rows.push(new Array(size))
  }
  return rows
}

function createField(size) {
  return {
    size,
    rows: createEmptyRows(size)
  }
}


const ACTION_HANDLERS = {
  [SELECT_CELL]: (state, action) => {
    return state
  },

  [GAME_START]: (state, action) => {
    return {...state, field: createField(state.field.size)}
  }
}


const initialState = {
  players: ['Pasha', 'Anti'],
  activePlayer: 0,
  field: createField(20)
}

export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
