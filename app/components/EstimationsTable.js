import React, { Component, PropTypes } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router'
import moment from 'moment'

export default class EstimationsTable extends Component {
  constructor(props) {
    super(props)

    this.deleteButtonFormatter = this.deleteButtonFormatter.bind(this)
  }

  handleDeleteEstimation(estimationId) {
    this.props.onDeleteEstimation(estimationId)
  }

  nameFormatter(cell, row) {
    return <Link to={`/estimations/${row.id}`}>{row.name}</Link>
  }

  dateFormatter(cell) {
    return moment(cell).format('LLL')
  }

  deleteButtonFormatter(cell) {
    return (
      <button
        type="button"
        className="close"
        aria-label="Delete"
        onClick={() => this.handleDeleteEstimation(cell)}
      >
        <span aria-hidden="true">×</span>
      </button>
    )
  }

  render() {
    const { estimations } = this.props

    return (
      <BootstrapTable data={estimations} striped hover>
        <TableHeaderColumn isKey dataField="id" hidden />
        <TableHeaderColumn dataField="name" dataFormat={this.nameFormatter}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="totalSum">Total Sum</TableHeaderColumn>
        <TableHeaderColumn dataField="totalRate">Total Rate</TableHeaderColumn>
        <TableHeaderColumn dataField="dateCreated" dataFormat={this.dateFormatter}>Date Created</TableHeaderColumn>
        <TableHeaderColumn dataField="dateModified" dataFormat={this.dateFormatter}>Date Modified</TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.deleteButtonFormatter} width="28" />
      </BootstrapTable>
    )
  }
}
