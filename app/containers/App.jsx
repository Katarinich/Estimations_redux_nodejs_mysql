import React, { PropTypes } from 'react'
import Message from 'containers/Message'
import classNames from 'classnames/bind'
import styles from 'css/main'

const cx = classNames.bind(styles)

const App = ({children}) => {
  return (
    <div className={cx('app')}>
      <Message />
      {children}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.object
}

export default App
