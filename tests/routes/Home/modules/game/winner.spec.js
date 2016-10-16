import getWinningCells from 'routes/Game/modules/game/winner'

import {
  SYMBOL_X,
  SYMBOL_O,
  SYMBOL_EMPTY,
} from 'routes/Game/modules/game/constants'


function createRows(stringLines) {
  const mapping = {
    ' ': SYMBOL_EMPTY,
    'x': SYMBOL_X,
    'o': SYMBOL_O,
  }
  const char2symbol = (char) => mapping[char]
  const stringToRow = (string) => string.split('').map(char2symbol)
  return stringLines.map(stringToRow)
}

describe('getWinningCells', () => {
  it('Should be a function.', () => {
    expect(getWinningCells).to.be.a('function')
  })

  it('Should return NULL if there is no win', () => {
    const rows = createRows([
      '   ',
      'xx ',
      '   ',
    ])
    expect(getWinningCells(rows, 3, 1, 0)).to.equal(null)
  })

  it('Should return horizontal winning line', () => {
    const rows = createRows([
      '   ',
      'xx ',
      '   ',
    ])
    let expected = [ [1, 0], [1, 1] ]
    expect(getWinningCells(rows, 2, 1, 0)).to.deep.equal(expected)
  })

  it('Should return vertical winning line', () => {
    const rows = createRows([
      ' o ',
      'xo ',
      ' o ',
    ])
    let expected = [ [0, 1], [1, 1], [2, 1] ]
    expect(getWinningCells(rows, 2, 1, 1)).to.deep.equal(expected)
  })

  it('Should return descending diagonal winning line', () => {
    const rows = createRows([
      'xo ',
      '  o',
      'x  ',
    ])
    let expected = [ [0, 1], [1, 2] ]
    expect(getWinningCells(rows, 2, 1, 2)).to.deep.equal(expected)
  })

  it('Should return ascending diagonal winning line', () => {
    const rows = createRows([
      'o ',
      ' xo',
      'x  ',
    ])
    let expected = [ [2, 0], [1, 1] ]
    expect(getWinningCells(rows, 2, 1, 1)).to.deep.equal(expected)
  })
})