import React, { Component, PropTypes } from 'react'

export default class EstimationEditBlockField extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.fieldType)
  }

  render() {
    const { text, isEdit, value, fieldType, onChange, onBlur, onKeyDown } = this.props

    if (isEdit) {
      return (
        <div>
          <input
            type="text"
            name={fieldType}
            className="form-control"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </div>
      )
    }

    return (
      <div onClick={this.handleClick}>
        {text}
      </div>
    )
  }
}
