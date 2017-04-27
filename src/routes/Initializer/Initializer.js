import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { localUrls } from '../../globals/urls'

export class Initializer extends React.Component {
  componentWillMount () {
    const { checkForStoredToken, fetchUser, logout } = this.props.accountActions
    const { initBegin, initEnd } = this.props.initActions

    initBegin()
    checkForStoredToken()
      .then(() => {
        fetchUser()
          .then(() => {
            // user logged in, profile fetched; no further action needed
            initEnd()
          }, () => {
            // error fetching user data with token (i.e. invalid/expire token);
            // logout & redirect to Login page
            logout().then(() => {
              initEnd()
              this.props.router.push(localUrls.login)
            })
          })
      }, () => {
        // no stored token; redirect to Login page
        initEnd()
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
  initActions: PropTypes.object.isRequired,
  accountActions: PropTypes.object.isRequired
}

export default withRouter(Initializer)
