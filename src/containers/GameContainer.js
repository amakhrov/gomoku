import { connect } from 'react-redux'
import { start, selectCell } from '../modules/game'
import { ActionCreators as HistoryActions } from 'redux-undo';

import Game from '../components/Game'

const mapDispatchToProps = {
  selectCell,
  start,

  undo: HistoryActions.undo,
  redo: HistoryActions.redo
}

const mapStateToProps = (state) => ({
  state: state.game.present,
  canUndo: !!state.game.past.length,
  canRedo: !!state.game.future.length,
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
