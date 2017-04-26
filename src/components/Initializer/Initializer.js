import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { localUrls } from '../../globals/urls'

export class Initializer extends React.Component {
  componentWillMount () {
    const { checkForStoredToken, fetchUser, logout } = this.props.accountActions

    checkForStoredToken()
      .then(() => {
        fetchUser()
          .then(() => {
            // user logged in, profile fetched; no further action needed
          }, () => {
            // error fetching user data with token (i.e. invalid/expire token);
            // logout & redirect to Login page
            logout().then(() => { this.props.router.push(localUrls.login) })
          })
      }, () => {
        // no stored token; redirect to Login page
        this.props.router.push(localUrls.login)
      })
  }

  render () {
    return (
      <div />
    )
  }
}

Initializer.propTypes = {
  router: PropTypes.object,
  accountActions: PropTypes.object.isRequired
}

export default withRouter(Initializer)
