import React, { Component, PropTypes } from 'react'

import EstimationEditBlock from 'components/estimation/edit/EstimationEditBlock'

export default class EstimationEditBlocks extends Component {
  renderBlocks() {
    const { blocks, parentBlockId } = this.props

    if (!blocks) {
      return null
    }

    const childBlocks = blocks.filter(b => b.parentBlockId === parentBlockId)

    return childBlocks.map((block) => {
      return (
        <EstimationEditBlock
          block={block}
          blocks={blocks}
          key={block.id}
          nestingLevel={this.props.nestingLevel || 0}
        />
      )
    })
  }

  render() {
    return (
      <ul style={{ listStyleType: 'none' }}>
        {this.renderBlocks()}
      </ul>
    )
  }
}

EstimationEditBlocks.defaultProps = {
  parentBlockId: null
}
