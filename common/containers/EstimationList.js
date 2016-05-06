import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as estimationActions from '../actions/EstimationActions'

class EstimationList extends Component {

  componentDidMount() {
    this.props.estimationActions.getEstimations()
  }

  render() {
    console.log(this.props)
    if(this.props.isFetching) return <span> {'Loading'} </span>

    var estimations = this.props.estimations.map(function(estimation) {
      return <li>{estimation.name}</li>
    })

    return <ul>{estimations}</ul>
  }

}

function mapStateToProps(state) {
  console.log(state)
  const { estimations } = state
  console.log(estimations.estimations)
  if(estimations.estimations) return {
    estimations: estimations.estimations
  }

  return {
    estimations: [],
    isFetching: true
  }
}

function mapDispatchToProps(dispatch) {
  return {
    estimationActions: bindActionCreators(estimationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstimationList)
