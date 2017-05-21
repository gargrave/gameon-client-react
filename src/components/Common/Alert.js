import React from 'react'
import PropTypes from 'prop-types'

const Alert = (props) => (
  <div className='alert alert-error'>
    <p className='alert-title'>{props.title}</p>
    <p className='alert-content'>{props.message}</p>
  </div>
)

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Alert
