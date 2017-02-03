import React from 'react'
import Field from './Field'
import Status from './Status'
import styles from './Game.scss'

const Button = (props) => (
  <button {...props} className={`btn btn-default ${styles.button}`}>{props.children}</button>
)

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}

export const Game = (props) => {
  return <div style={{margin: '0 auto'}} >
    <div className='header'>
      <Status {...props.state} />
      <div className={styles.controlsHistory}>
        <Button onClick={props.undo} disabled={!props.canUndo}>Undo</Button>
        <Button onClick={props.redo} disabled={!props.canRedo}>Redo</Button>
      </div>
      <div className={styles.controlsGame}>
        <label htmlFor='fieldSize'>Field Size:</label>
        <select id='fieldSize' value={props.state.fieldSize} onChange={(e) => props.changeFieldSize(+e.target.value)}>
          <option value='20'>20</option>
          <option value='40'>40</option>
          <option value='60'>60</option>
        </select>
        <Button onClick={props.start}>Restart</Button>
      </div>
    </div>
    <Field rows={props.state.rows} winningCells={props.state.winningCells} selectCell={props.selectCell} />
  </div>
}

Game.propTypes = {
  state: React.PropTypes.object.isRequired,
  canUndo: React.PropTypes.bool.isRequired,
  canRedo: React.PropTypes.bool.isRequired,

  start     : React.PropTypes.func.isRequired,
  selectCell : React.PropTypes.func.isRequired,
  changeFieldSize : React.PropTypes.func.isRequired,
  undo     : React.PropTypes.func.isRequired,
  redo : React.PropTypes.func.isRequired,
}

export default Game
