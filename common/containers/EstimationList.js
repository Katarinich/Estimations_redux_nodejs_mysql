import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as estimationActions from '../actions/EstimationActions'

class EstimationList extends Component {

  componentDidMount() {
    this.props.estimationActions.getEstimations()
  }

  render() {
    console.log(this.props)
    if(this.props.isFetching && !this.props.estimations) return <span> {'Loading'} </span>

    var estimations = this.props.estimations.map(function(estimation) {
      var estimationLink = '/estimation/' + estimation.id
      return <li><Link to={estimationLink}>{estimation.name}</Link></li>
    })

    return <ul>{estimations}</ul>
  }

}

function mapStateToProps(state) {
  console.log(state)
  const { estimation } = state
  console.log(estimation.estimations)
  if(estimation.estimations) return {
    estimations: estimation.estimations
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
