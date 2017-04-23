import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EstimationEditData from 'components/EstimationEditData'

import { getEstimation } from 'actions/estimations'

class Estimation extends Component {
  componentDidMount() {
    this.props.getEstimation(this.props.params.estimationId)
  }

  render() {
    const { estimation } = this.props

    return (
      <div>
        <EstimationEditData extimation={estimation} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    estimation: state.estimation.estimation
  }
}

export default connect(mapStateToProps, { getEstimation })(Estimation)
