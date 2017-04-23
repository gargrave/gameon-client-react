import React from 'react'
import PropTypes from 'prop-types'

import RequireAuth from '../../../../../components/RequireAuth'

class ProfilePage extends React.Component {
  render () {
    return (
      <div>
        <h2>Profile Page</h2>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  loggedIn: PropTypes.bool
}

export default RequireAuth(ProfilePage)
