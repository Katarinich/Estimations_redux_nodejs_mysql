import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import EstimationEditBlocks from 'components/estimation/edit/EstimationEditBlocks'
import EstimationEditBlockField from 'components/estimation/edit/EstimationEditBlockField'

import { setEditData, resetEditData } from 'actions/editData'
import { updateEstimationBlock } from 'actions/estimations'

class EstimationEditBlock extends Component {
  constructor(props) {
    super(props)

    const { text, hours, rate } = props.block

    this.state = {
      text,
      hours,
      rate
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  getBlockSum() {
    const { block } = this.props

    return parseInt(block.hours, 10) * block.rate
  }

  handleAddNewBlock() {
    return
  }

  handleClick(fieldType) {
    this.props.setEditData(this.props.block.id, fieldType)
  }

  handleBlur() {
    const { block } = this.props
    const { text, hours, rate } = this.state

    this.props.resetEditData()

    this.props.updateEstimationBlock(block.id, block.estimationId, { ...block, text, hours, rate })
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleKeyDown(e) {
    if (e.keyCode !== 13) {
      return
    }

    const { editBlock, editField } = this.props

    let newEditField = null
    switch (editField) {
      case 'text': {
        newEditField = 'hours'
        break
      }

      case 'hours': {
        newEditField = 'rate'
        break
      }

      case 'rate': {
        this.handleAddNewBlock()
        return
      }

      default: {
        return
      }
    }

    this.props.setEditData(editBlock, newEditField)
  }

  render() {
    const { block, blocks, nestingLevel, editBlock, editField } = this.props
    const { text, hours, rate } = this.state

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
                value={text}
                fieldType={'text'}
                isEdit={isEdit && editField === 'text'}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
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
              value={text}
              fieldType={'text'}
              isEdit={isEdit && editField === 'text'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="col-sm-2">
            <EstimationEditBlockField
              text={block.hours}
              value={hours}
              fieldType={'hours'}
              isEdit={isEdit && editField === 'hours'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="col-sm-2">
            <EstimationEditBlockField
              text={block.rate}
              value={rate}
              fieldType={'rate'}
              isEdit={isEdit && editField === 'rate'}
              onClick={this.handleClick}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
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

export default connect(mapStateToProps, { setEditData, resetEditData, updateEstimationBlock })(EstimationEditBlock)
