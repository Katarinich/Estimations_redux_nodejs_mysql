import React, { Component, PropTypes } from 'react'

export default class Breadcrumbs extends Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li className="active">Estimations</li>
        <li className="pull-right">{this.props.email} | <a href="#" onClick={this.props.onLogOutClick}>Log out</a></li>
      </ol>
    )
  }
}
