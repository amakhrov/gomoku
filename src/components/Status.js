import React from 'react'
import styles from './Status.scss'

const Player = (props) => (
  <div className={styles.player} data-isActive={props.isActive} data-isWinner={props.isWinner}>
    <span>{props.name}</span>
    {' '}
    (<span className={styles.symbol} data-symbol={props.symbol}>{props.symbol}</span>)
  </div>
)

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  symbol: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  isWinner: React.PropTypes.bool.isRequired,
}

export const Status = (props) => (
  <div>
    {props.players.map((player, i) => {
      const isWinner = i === props.winningPlayer
      const isActive = i === props.activePlayer
      const playerProps = {
        ...player,
        isWinner: isWinner,
        isActive: isActive
      }
      return <Player {...playerProps} key={i} />
    })}
  </div>
)

Status.propTypes = {
  players: React.PropTypes.array.isRequired,
  activePlayer: React.PropTypes.number.isRequired,
  winningPlayer: React.PropTypes.number,
}

export default Status
