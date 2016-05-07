import React, { Component } from 'react'
//import Block from './Block'

export default class Estimation extends Component {
  render() {
    // const { block } = this.props
    // const { getInput } = this.props
    // return <ul className="blocks">
    //   <Block block={ block } getInput={ getInput } />
    // </ul>
    return (<div>{this.props.params.id}</div>)
  }
}
