import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EstimationsTable from 'components/EstimationsTable'

import { getEstimations, createEstimation, deleteEstimation } from 'actions/estimations'

class Estimations extends Component {
  componentDidMount() {
    this.props.getEstimations()
  }

  handleAddEstimation() {
    this.props.createEstimation()
  }

  handleDeleteEstimation(estimationId) {
    // TODO: add confiramtion message
    this.props.deleteEstimation(estimationId)
  }

  render() {
    const { estimations } = this.props

    return (
      <div>
        <div style={{ marginLeft: '10px' }}>
          <button className="btn btn-default" onClick={() => this.handleAddEstimation()}>Add</button>
        </div>
        <EstimationsTable
          estimations={estimations}
          onAddEstimation={() => this.handleAddEstimation()}
          onDeleteEstimation={(id) => this.handleDeleteEstimation(id)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    estimations: state.estimation.estimations
  }
}

export default connect(mapStateToProps, {
  getEstimations,
  createEstimation,
  deleteEstimation
})(Estimations)
