import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Breadcrumbs from 'components/Breadcrumbs'

import { logOut } from 'actions/auth'

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Breadcrumbs email={this.props.auth.email} onLogOutClick={this.props.logOut} />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

Main.propTypes = {
  children: PropTypes.object
}

export default connect(mapStateToProps, { logOut })(Main)
