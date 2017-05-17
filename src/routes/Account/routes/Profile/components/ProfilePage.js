import React from 'react'
import PropTypes from 'prop-types'

import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

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
    const { profile, user } = this.props
    return (
      <Paper className='go-paper'>
        <h2 className='page-title'>Profile Page</h2>

        {this.props.ajaxPending && <p>Working...</p>}

        <List>
          <ListItem primaryText='Name'
            secondaryText={`${profile.firstName} ${profile.lastName}`}
          />
          <ListItem primaryText='Username' secondaryText={user.username} />
          <ListItem primaryText='Email' secondaryText={user.email} />
          <ListItem primaryText='Joined on' secondaryText={user.dateJoined} />
        </List>

        <RaisedButton
          primary
          id='profile-btn-logout'
          label='Logout'
          onClick={e => this.handleLogout(e)}
        />
      </Paper>
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
