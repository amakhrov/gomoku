import React from 'react'
import Field from './Field'

export const Game = (props) => {
  return   <div style={{ margin: '0 auto' }} >
    <button className='btn btn-default' onClick={props.start}>
      Start
    </button>
    <Field rows={props.state.rows} selectCell={props.selectCell}/>
  </div>

}
Game.propTypes = {
  state: React.PropTypes.object.isRequired,
  start     : React.PropTypes.func.isRequired,
  selectCell : React.PropTypes.func.isRequired,
}

export default Game
