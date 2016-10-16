import {SYMBOL_EMPTY} from './constants'

const helpers = {
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

  isCellInRange(rows, row, column) {
    const isInRange = (coord) => coord >= 0 && coord < rows.length
    return isInRange(row) && isInRange(column)
  },

  ensureCellInRange(rows, row, column) {
    if (!helpers.isCellInRange(rows, row, column)) {
      throw new Error(`Cell coordinates (${row}, ${column}) are not within field size (${rows.length})`)
    }
  },

  isCellEmpty(rows, row, column) {
    helpers.ensureCellInRange(rows, row, column)

    return rows[row][column] === SYMBOL_EMPTY
  },

  setCell(rows, row, column, symbol) {
    helpers.ensureCellInRange(rows, row, column)

    let newRow = [...rows[row]]
    newRow[column] = symbol

    let newRows = [...rows]
    newRows[row] = newRow

    return newRows
  }
}

export default helpers
