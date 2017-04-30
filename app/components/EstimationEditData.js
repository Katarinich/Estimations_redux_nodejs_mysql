import React, { Component, PropTypes } from 'react'

import EstimationEditBlocks from 'components/estimation/edit/EstimationEditBlocks'

export default class EstimationEditData extends Component {
  render() {
    const { estimation } = this.props

    return (
      <div>
        <EstimationEditBlocks blocks={estimation.blocks} />
      </div>
    )
  }
}
