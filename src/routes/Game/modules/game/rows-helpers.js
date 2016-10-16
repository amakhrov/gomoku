import {SYMBOL_EMPTY} from './constants'

export default {
  createRows(size) {
    let rows = []
    for (let i=0; i<size; i++) {
      let row = new Array(size)

      for (let j=0; j<size; j++) {
        row[j] = SYMBOL_EMPTY
      }

      rows.push(row)
    }
    return rows
  },

  isCellEmpty(rows, row, column) {
    return rows[row][column] === SYMBOL_EMPTY
  },

  setCell(rows, row, column, symbol) {
    let newRow = [...rows[row]]
    newRow[column] = symbol

    let newRows = [...rows]
    newRows[row] = newRow

    return newRows
  }
}
