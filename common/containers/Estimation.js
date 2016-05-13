import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Block from './Block'

import * as blockActions from '../actions/BlockActions'

class Estimation extends Component {
  componentDidMount() {
    this.props.blockActions.getBlocks({id: this.props.params.id})
  }

  render() {
    // const { block } = this.props
    // const { getInput } = this.props
    // return <ul className="blocks">
    //   <Block block={ block } getInput={ getInput } />
    // </ul>
    return (<div>{this.props.params.id}</div>)
  }
}

function mapStateToProps(state) {
  console.log(state)
  const { block } = state
  console.log(block.blocks)
  if(block.blocks) return {
    blocks: block.blocks
  }

  return {
    blocks: [],
    isFetching: true
  }
}

function mapDispatchToProps(dispatch) {
  return {
    blockActions: bindActionCreators(blockActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Estimation)
