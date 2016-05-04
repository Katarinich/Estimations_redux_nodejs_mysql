import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as blockActions from '../actions/BlockActions'

import Estimation from '../components/Estimation'

class App extends Component {
  render() {
    const { block } = this.props
    const { getInput } = this.props.blockActions
    return <Estimation block={ block } getInput={ getInput }/>
  }
}

function mapStateToProps(state) {
  return {
    block: state.block
  }
}

function mapDispatchToProps(dispatch) {
  return {
    blockActions: bindActionCreators(blockActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
