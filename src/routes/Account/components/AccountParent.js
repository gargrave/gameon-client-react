import React from 'react'
import PropTypes from 'prop-types'

const AccountParent = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

AccountParent.propTypes = {
  children: PropTypes.object
}

export default AccountParent
