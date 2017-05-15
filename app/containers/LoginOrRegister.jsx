import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'

import { manualLogin, signUp } from 'actions/auth'
import styles from 'css/components/login'
import hourGlassSvg from 'images/hourglass.svg'

const cx = classNames.bind(styles)

class LoginOrRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      email: '',
      password: ''
    }

    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate() {
    const { from } = this.props.location.state || { from: { pathname: '/estimations' } }

    if (this.props.auth.authenticated) {
      browserHistory.push(from)
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit(event) {
    event.preventDefault()

    const { isLogin, email, password } = this.state

    if (isLogin) {
      this.props.manualLogin({email, password})
    } else {
      this.props.signUp({email, password})
    }
  }

  renderHeader() {
    const { isLogin } = this.state

    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login with Email</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <a className={cx('alternative-link')} onClick={() => this.setState({ isLogin: false })}>
              Register an Account
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a className={cx('alternative-link')} onClick={() => this.setState({ isLogin: true })}>
            Login
          </a>
        </div>
      </div>
    )
  }

  render() {
    const { isWaiting, message } = this.props.auth
    const { isLogin } = this.state

    return (
      <div className={cx('login', {waiting: isWaiting})}>
        <div>
          {this.renderHeader()}
          <img className={cx('loading')} src={hourGlassSvg} role="presentation" />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input className={cx('input')} type="email" name="email" placeholder="email" onChange={this.handleChange} />
              <input className={cx('input')} type="password" name="password" placeholder="password" onChange={this.handleChange} />
              <p className={cx('message', {'message-show': message && message.length > 0})}>
                {message}
              </p>
              <input className={cx('button')} type="submit" value={isLogin ? 'Login' : 'Register'} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

LoginOrRegister.propTypes = {
  auth: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { manualLogin, signUp })(LoginOrRegister)
