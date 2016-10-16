import helpers from 'modules/game/rows-helpers'

import {
  SYMBOL_X,
  SYMBOL_O,
  SYMBOL_EMPTY,
} from 'modules/game/constants'

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

describe('(Game logic)', () => {

  describe('createRows', () => {
    it('Should be a function.', () => {
      expect(helpers.createRows).to.be.a('function')
    })

    it('Should generate a square field of a given size', () => {
      let rows = helpers.createRows(2)

      expect(rows).to.deep.equal(createRows([
        '  ',
        '  ',
      ]))
    })
  })

  describe('isCellEmpty', () => {
    let rows

    beforeEach(() => {
      rows = helpers.createRows(2)
    })

    it('Should be a function.', () => {
      expect(helpers.isCellEmpty).to.be.a('function')
    })

    it('Should treat X as non-empty cell', () => {
      rows[0][0] = SYMBOL_X
      expect(helpers.isCellEmpty(rows, 0, 0)).to.equal(false)
    })

    it('Should treat O as non-empty cell', () => {
      rows[1][1] = SYMBOL_O
      expect(helpers.isCellEmpty(rows, 1, 1)).to.equal(false)
    })

    it('Should treat EMPTY as an empty cell', () => {
      rows[1][0] = SYMBOL_EMPTY
      expect(helpers.isCellEmpty(rows, 1, 0)).to.equal(true)
    })
  })

  describe('setCell', () => {
    let rows

    beforeEach(() => {
      rows = helpers.createRows(2)
    })

    it('Should be a function.', () => {
      expect(helpers.setCell).to.be.a('function')
    })

    it('Should set a cell to specified symbol', () => {
      let newRows = helpers.setCell(rows, 1, 1, SYMBOL_X)

      expect(newRows).to.deep.equal(createRows([
        '  ',
        ' x',
      ]))
    })

    it('Should not mutate original rows', () => {
      let before = JSON.stringify(rows)
      let newRows = helpers.setCell(rows, 1, 1, SYMBOL_X)
      let after = JSON.stringify(rows)
      expect(after).to.equal(before)
    })
  })

})
