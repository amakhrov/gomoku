import React from 'react'

export const Field = (props) => (
  <div style={{ margin: '0 auto' }} >
    {props.rows.map((row, i) => (
      <div key={i}>
        {row.map((symbol, j) => (
          <span key={j} onClick={() => props.selectCell(i, j)}>{symbol}</span>
        ))}
      </div>
    ))}
  </div>
)

Field.propTypes = {
  rows: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  selectCell : React.PropTypes.func.isRequired,
}

export default Field
