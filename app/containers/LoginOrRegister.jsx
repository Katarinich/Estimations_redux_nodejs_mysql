import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { manualLogin, signUp } from 'actions/auth'
import styles from 'css/components/login'
import hourGlassSvg from 'images/hourglass.svg'

const cx = classNames.bind(styles)

class LoginOrRegister extends Component {
    constructor(props) {
        super(props)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)

        this.state = {
            isLogin: true
        }
    }

    handleOnSubmit(event) {
        event.preventDefault();

        const { isLogin } = this.state
        const { manualLogin, signUp } = this.props;
        const email = ReactDOM.findDOMNode(this.refs.email).value;
        const password = ReactDOM.findDOMNode(this.refs.password).value;

        if (isLogin) {
            manualLogin({email, password});
        } else {
            signUp({email, password});
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
                        <a className={cx('alternative-link')} onClick={ () => this.setState({ isLogin: false }) }>
                            Register an Account</a>
                    </div>
                </div>
            );
        }

        return (
            <div className={cx('header')}>
                <h1 className={cx('heading')}>Register with Email</h1>
                <div className={cx('alternative')}>
                    Already have an account?
                    <a className={cx('alternative-link')} onClick={ () => this.setState({ isLogin: true }) }>
                        Login</a>
                </div>
            </div>
        );
    }

    render() {
        const { isWaiting, message } = this.props.auth
        const { isLogin } = this.state

        return (
            <div className={cx('login', {waiting: isWaiting})}>
                <div className={cx('container')}>
                    {this.renderHeader()}
                    <img className={cx('loading')} src={hourGlassSvg}/>
                    <div className={cx('email-container')}>
                        <form onSubmit={this.handleOnSubmit}>
                            <input className={cx('input')} type="email" ref="email" placeholder="email"/>
                            <input className={cx('input')} type="password" ref="password" placeholder="password"/>
                            <p className={cx('message', {
                                'message-show': message && message.length > 0
                            })}>{message}</p>
                            <input className={cx('button')} type="submit" value={isLogin
                                ? 'Login'
                                : 'Register'}/>
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

export default connect(mapStateToProps, { manualLogin, signUp })(LoginOrRegister);
