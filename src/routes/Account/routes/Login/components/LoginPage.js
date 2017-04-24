import React from 'react'
import PropTypes from 'prop-types'
import { Message, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'

import LoginForm from './LoginForm'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    let newState = Object.assign({}, this.state)
    const key = event.target.name
    const value = event.target.value

    if (newState.hasOwnProperty(key)) {
      newState[key] = value
      this.setState(newState)
    }
  }

  handleLogin (event) {
    event.preventDefault()
    this.props.actions.login(this.state)
      .then(() => {
        this.props.actions.fetchUser()
          .then(() => {
            this.props.router.replace(localUrls.profile)
          })
      }, () => { })
  }

  render () {
    return (
      <Segment style={{ maxWidth: 600, margin: 'auto' }}>
        <h2>Login Page</h2>

        {this.props.apiError &&
          <Message negative>
            <Message.Header>Login Error</Message.Header>
            <p>Could not log in with the provided credentials. Please try again.</p>
          </Message>
        }

        <LoginForm
          working={this.props.ajaxPending}
          state={this.state}
          changed={this.handleChange}
          submitted={this.handleLogin}
        />
      </Segment>
    )
  }
}

LoginPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default LoginPage
