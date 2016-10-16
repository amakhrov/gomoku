import {SYMBOL_EMPTY} from './constants'

export default function getWinningCells (rows, lineSize, row, column) {
  const symbol = rows[row][column]
  if (symbol === SYMBOL_EMPTY) return null

  return combineLines([
    getWinningHorizontal(rows, lineSize, row, column),
    getWinningVertical(rows, lineSize, row, column),
    getWinningDiagonalDescending(rows, lineSize, row, column),
    getWinningDiagonalAscending(rows, lineSize, row, column)
  ])
}

function combineLines(lines) {
  let allCells = {}
  lines.forEach((line) => {
    if (!line) return
    line.forEach((cell) => {
      allCells[getCellKey(cell)] = cell
    })
  })

  let keys = Object.keys(allCells)
  if (!keys.length) return null
  return keys.map((key) => allCells[key])
}

function getCellKey(cell) {
  let [row, column] = cell
  return `${row}|${column}`
}

function getLine(rows, lineSize, row, column, deltaRow, deltaColumn) {
  const symbol = rows[row][column]
  const size = rows.length

  const getNextCol = (col) => col + deltaColumn
  const getNextRow = (row) => row + deltaRow
  const getPrevCol = (col) => col - deltaColumn
  const getPrevRow = (row) => row - deltaRow
  const isCoordInRange = (coord) => coord >= 0 && coord < size
  const isInRange = (row, col) => isCoordInRange(row) && isCoordInRange(col)

  let lastCol = column
  let lastRow = row
  let firstCol = column
  let firstRow = row

  let winning = [ [row, column] ]

  // go forward from the starting point
  while (true) {
    let nextRow = getNextRow(lastRow)
    let nextCol = getNextCol(lastCol)
    if (!isInRange(nextRow, nextCol)) break
    if (rows[nextRow][nextCol] !== symbol) break
    lastRow = nextRow
    lastCol = nextCol
    winning.push([lastRow, lastCol])
  }

  // go backward from the starting point
  while (true) {
    let prevRow = getPrevRow(firstRow)
    let prevCol = getPrevCol(firstCol)
    if (!isInRange(prevRow, prevCol)) break
    if (rows[prevRow][prevCol] !== symbol) break
    firstRow = prevRow
    firstCol = prevCol
    winning.unshift([firstRow, firstCol])
  }

  if (firstCol > lastCol) {
    winning = winning.reverse()
  }

  if (winning.length < lineSize) return null

  return winning
}

function getWinningHorizontal(rows, lineSize, row, column) {
  return getLine(rows, lineSize, row, column, 0, 1)
}

function getWinningVertical(rows, lineSize, row, column) {
  return getLine(rows, lineSize, row, column, 1, 0)
}

function getWinningDiagonalDescending(rows, lineSize, row, column) {
  return getLine(rows, lineSize, row, column, 1, 1)
}

function getWinningDiagonalAscending(rows, lineSize, row, column) {
  return getLine(rows, lineSize, row, column, 1, -1)
}