import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import GameContainer from './GameContainer'

class AppContainer extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <GameContainer />
      </Provider>
    )
  }
}

AppContainer.test = 3

export default AppContainer
