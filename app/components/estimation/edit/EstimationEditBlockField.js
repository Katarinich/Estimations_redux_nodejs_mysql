import React, { Component, PropTypes } from 'react'

export default class EstimationEditBlockField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.text
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleBlur() {
    this.props.onBlur(this.state.value)
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  handleClick() {
    this.props.onClick(this.props.fieldType)
  }

  render() {
    const { text, isEdit } = this.props
    const { value } = this.state

    if (isEdit) {
      return (
        <div>
          <input
            type="text"
            className="form-control"
            value={value}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
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
