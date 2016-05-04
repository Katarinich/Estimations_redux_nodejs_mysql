import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as estimationActions from '../actions/EstimationActions'

class EstimationApp extends Component {

  handleClick() {
    this.props.estimationActions.createEstimation({
      name: 'new estimation',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      totalSum: 0,
      totalHours: 0
    })
  }

  render() {
    return (
      <button
        onClick={ () => this.handleClick() }>
        { 'Create' }
      </button>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    estimationActions: bindActionCreators(estimationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstimationApp)
