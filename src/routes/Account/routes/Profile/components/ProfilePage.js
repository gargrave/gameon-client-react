import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, List, Loader, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'

import RequireAuth from '../../../../../components/RequireAuth'

class ProfilePage extends React.Component {
  handleLogout (event) {
    event.preventDefault()
    this.props.actions.logout()
      .then(() => {
        this.props.router.replace(localUrls.login)
      }, () => { })
  }

  render () {
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>Profile Page</h2>

        <Dimmer inverted active={this.props.ajaxPending}>
          <Loader inverted>Working...</Loader>
        </Dimmer>

        <List>
          <List.Item><strong>Name:</strong> {this.props.profile.firstName} {this.props.profile.lastName}</List.Item>
          <List.Item><strong>Username:</strong> {this.props.user.username}</List.Item>
          <List.Item><strong>Email:</strong> {this.props.user.email}</List.Item>
          <List.Item><strong>Joined on:</strong> {this.props.user.dateJoined}</List.Item>
        </List>

        <Button onClick={e => this.handleLogout(e)}>Log Out</Button>
      </Segment>
    )
  }
}

ProfilePage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default RequireAuth(ProfilePage)
