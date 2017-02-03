import React from 'react'
import styles from './Field.scss'

const getCellKey = (row, col) => `${row}|${col}`

export const Field = (props) => {
  const {rows, winningCells} = props
  const cellsInRow = rows[0].length
  const size = (100 / cellsInRow) + '%'
  const padding = `calc(-2px + ${size})`

  let winning = {}
  if (winningCells) {
    winningCells.forEach((cell) => {
      winning[getCellKey(cell[0], cell[1])] = true
    })
  }

  const isWinning = (row, col) => getCellKey(row, col) in winning

  return <div style={{margin: '0 auto'}} >
    {rows.map((row, i) => (
      <div key={i} className={styles.row}>
        {row.map((symbol, j) => {
          return <span
            key={j}
            className={styles.cell}
            onClick={() => props.selectCell(i, j)}
            data-symbol={symbol}
            data-isWinning={isWinning(i, j)}
            style={{
              width: size,
              paddingBottom: padding
            }}
          />
        })}
      </div>
    ))}
  </div>
}

Field.propTypes = {
  rows: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  winningCells: React.PropTypes.arrayOf(React.PropTypes.array),
  selectCell : React.PropTypes.func.isRequired
}

export default Field
