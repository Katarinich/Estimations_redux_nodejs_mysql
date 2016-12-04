import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getEstimations } from 'actions/estimations'

class Estimations extends Component {
  componentDidMount() {
    this.props.getEstimations()
  }

  render() {
    return (
      <div>
        Welcome to the Estimations. Stay tuned...
      </div>
    );
  }
}

Estimations.propTypes = {
  getEstimations: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    estimations: state.estimation.estimations
  }
}

export default connect(mapStateToProps, { getEstimations })(Estimations)
