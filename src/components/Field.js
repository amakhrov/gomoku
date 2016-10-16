import React from 'react'
import styles from './Field.scss'

export const Field = (props) => {
  const {rows} = props
  const cellsInRow = rows[0].length
  const size = (100 / cellsInRow) + '%'

  return <div style={{ margin: '0 auto' }} >
    {rows.map((row, i) => (
      <div key={i} className={styles.row}>
        {row.map((symbol, j) => (
          <span
            key={j}
            className={styles.cell}
            onClick={() => props.selectCell(i, j)}
            data-symbol={symbol}
            style={{
              width: size,
              paddingBottom: size
            }}
          />
        ))}
      </div>
    ))}
  </div>
}

Field.propTypes = {
  rows: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  selectCell : React.PropTypes.func.isRequired,
}

export default Field
