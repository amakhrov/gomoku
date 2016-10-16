import React from 'react'
import Field from './Field'
import Status from './Status'

export const Game = (props) => {
  return   <div style={{ margin: '0 auto' }} >
    <Status {...props.state} />
    <button className='btn btn-default' onClick={props.start}>Restart</button>
    <button className='btn btn-default' onClick={props.undo} disabled={!props.canUndo}>Undo</button>
    <button className='btn btn-default' onClick={props.redo} disabled={!props.canRedo}>Redo</button>
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
