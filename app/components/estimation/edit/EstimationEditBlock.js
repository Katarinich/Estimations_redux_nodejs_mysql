import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EstimationEditBlocks from 'components/estimation/edit/EstimationEditBlocks'
import EstimationEditBlockField from 'components/estimation/edit/EstimationEditBlockField'

import { setEditData, resetEditData } from 'actions/editData'

class EstimationEditBlock extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  getBlockSum() {
    const { block } = this.props

    return parseInt(block.hours, 10) * block.rate
  }

  handleClick(fieldType) {
    this.props.setEditData(this.props.block.id, fieldType)
  }

  handleBlur() {
    this.props.resetEditData()
  }

  render() {
    const { block, blocks, nestingLevel, editBlock, editField } = this.props

    const childBlocks = blocks.filter(b => b.parentBlockId === block.id)
    const isParent = childBlocks.length !== 0

    const isEdit = editBlock === block.id

    if (isParent) {
      return (
        <li>
          <div className="row">
            <div className="col-sm-4">
              <EstimationEditBlockField
                text={block.text}
                fieldType={'text'}
                isEdit={isEdit && editField === 'text'}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
              />
            </div>
          </div>
          <EstimationEditBlocks
            blocks={blocks}
            parentBlockId={block.id}
            nestingLevel={nestingLevel + 1}
          />
        </li>
      )
    }

    return (
      <li>
        <div className="row">
          <div className="col-sm-4">
            <EstimationEditBlockField
              text={block.text}
              fieldType={'text'}
              isEdit={isEdit && editField === 'text'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="col-sm-2">
            <EstimationEditBlockField
              text={block.hours}
              fieldType={'hours'}
              isEdit={isEdit && editField === 'hours'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="col-sm-2">
            <EstimationEditBlockField
              text={block.rate}
              fieldType={'rate'}
              isEdit={isEdit && editField === 'rate'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="col-sm-2">{this.getBlockSum()}</div>
        </div>
      </li>
    )
  }
}

EstimationEditBlock.propTypes = {
  block: PropTypes.object.isRequired,
  blocks: PropTypes.array.isRequired,
  nestingLevel: PropTypes.number
}

function mapStateToProps(state) {
  return {
    editBlock: state.editData.editBlock,
    editField: state.editData.editField
  }
}

export default connect(mapStateToProps, { setEditData, resetEditData })(EstimationEditBlock)
