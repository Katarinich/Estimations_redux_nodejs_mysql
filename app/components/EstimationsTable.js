import React, { Component, PropTypes } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Link } from 'react-router'
import moment from 'moment'

export default class EstimationsTable extends Component {
  nameFormatter(cell, row) {
    return <Link to={`/estimations/${row.id}`}>{row.name}</Link>
  }

  dateFormatter(cell, row) {
    return moment(cell).format('LLL');
  }

  render() {
    const { estimations } = this.props

    return (
      <BootstrapTable data={estimations} striped hover>
        <TableHeaderColumn isKey dataField='id' hidden></TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='totalSum'>Total Sum</TableHeaderColumn>
        <TableHeaderColumn dataField='totalRate'>Total Rate</TableHeaderColumn>
        <TableHeaderColumn dataField='dateCreated' dataFormat={this.dateFormatter}>Date Created</TableHeaderColumn>
        <TableHeaderColumn dataField='dateModified' dataFormat={this.dateFormatter}>Date Modified</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}
