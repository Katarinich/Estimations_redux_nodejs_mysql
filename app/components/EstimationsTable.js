import React, { Component, PropTypes } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'

export default class EstimationsTable extends Component {
  render() {
    const { estimations } = this.props

    function dateFormatter(cell, row) {
      return moment(cell).format('LLL');
    }

    return (
      <BootstrapTable data={estimations} striped hover>
        <TableHeaderColumn isKey dataField='id' hidden></TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='totalSum'>Total Sum</TableHeaderColumn>
        <TableHeaderColumn dataField='totalRate'>Total Rate</TableHeaderColumn>
        <TableHeaderColumn dataField='dateCreated' dataFormat={dateFormatter}>Date Created</TableHeaderColumn>
        <TableHeaderColumn dataField='dateModified' dataFormat={dateFormatter}>Date Modified</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}
