import { connect } from 'react-redux'
import { start, selectCell } from '../modules/game'

import Game from '../components/Game'

const mapDispatchToProps = {
  selectCell,
  start
}

const mapStateToProps = (state) => ({
  state: state.game
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
