import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'

import RequireAuth from '../../../../../components/RequireAuth'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (event) {
    event.preventDefault()
    this.props.actions.logout()
      .then(() => {
        this.props.router.replace(localUrls.login)
      }, () => { })
  }

  render () {
    return (
      <Segment style={{ maxWidth: 600, margin: 'auto' }}>
        <h2>Profile Page</h2>

        <Dimmer inverted active={this.props.ajaxPending}>
          <Loader inverted>Working...</Loader>
        </Dimmer>

        <Button onClick={this.handleLogout}>Log Out</Button>
      </Segment>
    )
  }
}

ProfilePage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RequireAuth(ProfilePage)
