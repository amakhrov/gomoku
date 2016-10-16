import React from 'react'
import styles from './Status.scss'

const Player = (props) => (
  <div className={styles.player} data-isActive={props.isActive}>
    <span>{props.name}</span>
    { }
    (<span>{props.symbol}</span>)
  </div>
)

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  symbol: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
}

export const Status = (props) => (
  <div>
    {props.players.map((player, i) => {
      const playerProps = {...player, isActive: i === props.activePlayer}
      return <Player {...playerProps} />
    })}
  </div>
)

Status.propTypes = {
  players: React.PropTypes.object.isRequired,
  activePlayer: React.PropTypes.number.isRequired,
}

export default Status
