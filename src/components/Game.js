import React from 'react'

export const Game = (props) => (
  <div style={{ margin: '0 auto' }} >
    <button className='btn btn-default' onClick={props.start}>
      Start
    </button>
  </div>
)

Game.propTypes = {
  start     : React.PropTypes.func.isRequired,
  selectCell : React.PropTypes.func.isRequired,
}

export default Game
