import React from 'react'
import PropTypes from 'prop-types'
import { Message, Segment } from 'semantic-ui-react'
import validator from 'validator'

import { valErrs } from '../../../../../globals/errors'
import { localUrls } from '../../../../../globals/urls'

import LoginForm from './LoginForm'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loginData: {
        username: '',
        password: ''
      },
      validationErrors: {
        username: '',
        password: ''
      }
    }
  }

  handleChange (event) {
    event.preventDefault()
    let loginData = Object.assign({}, this.state.loginData)
    const key = event.target.name
    const value = event.target.value

    if (loginData.hasOwnProperty(key)) {
      loginData[key] = value
      this.setState({ loginData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.isValid()) {
      this.props.actions.login(this.state.loginData)
        .then(() => {
          this.props.actions.fetchUser()
            .then(() => {
              this.props.router.replace(localUrls.profile)
            })
        }, err => {
          this.apiError = err
        })
    }
  }

  isValid () {
    let valid = true
    let loginData = Object.assign({}, this.state.loginData)
    let validationErrors = { username: '', password: '' }

    // validate username -> required
    validationErrors.username = ''
    if (validator.isEmpty(loginData.username)) {
      validationErrors.username = valErrs.required
      valid = false
    }

    // validate password -> required, min 8 digits
    validationErrors.password = ''
    if (validator.isEmpty(loginData.password)) {
      validationErrors.password = valErrs.required
      valid = false
    } else if (!validator.isLength(loginData.password, { min: 8 })) {
      validationErrors.password = valErrs.length(8)
      valid = false
    }

    this.setState({ validationErrors })
    return valid
  }

  render () {
    return (
      <Segment style={{ maxWidth: 600, margin: 'auto' }}>
        <h2 className='page-title'>Login Page</h2>

        {this.props.apiError &&
          <Message negative>
            <Message.Header>Login Error</Message.Header>
            <p>Could not log in with the provided credentials. Please try again.</p>
          </Message>
        }

        <LoginForm
          working={this.props.ajaxPending}
          loginData={this.state.loginData}
          errors={this.state.validationErrors}
          changed={e => this.handleChange(e)}
          submitted={e => this.handleSubmit(e)}
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
