import React from 'react'
import Field from './Field'
import Status from './Status'
import styles from './Game.scss'

const Button = (props) =>  (
  <button {...props} className={`btn btn-default ${styles.button}`}>{props.children}</button>
)

export const Game = (props) => {
  return   <div style={{ margin: '0 auto' }} >
    <Status {...props.state} />
    <Button onClick={props.start}>Restart</Button>
    <Button onClick={props.undo} disabled={!props.canUndo}>Undo</Button>
    <Button onClick={props.redo} disabled={!props.canRedo}>Redo</Button>
    <Field rows={props.state.rows} winningCells={props.state.winningCells} selectCell={props.selectCell}/>
  </div>

}
Game.propTypes = {
  state: React.PropTypes.object.isRequired,
  canUndo: React.PropTypes.bool.isRequired,
  canRedo: React.PropTypes.bool.isRequired,

  start     : React.PropTypes.func.isRequired,
  selectCell : React.PropTypes.func.isRequired,
  undo     : React.PropTypes.func.isRequired,
  redo : React.PropTypes.func.isRequired,
}

export default Game
