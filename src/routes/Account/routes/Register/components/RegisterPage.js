import React from 'react'
import PropTypes from 'prop-types'
import { Message, Segment } from 'semantic-ui-react'
import validator from 'validator'

import { valErrs } from '../../../../../globals/errors'
import { localUrls } from '../../../../../globals/urls'

import RegisterForm from '../components/RegisterForm'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      registerData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      validationErrors: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  }

  handleChange (event) {
    event.preventDefault()
    let registerData = Object.assign({}, this.state.registerData)
    const key = event.target.name
    const value = event.target.value

    if (registerData.hasOwnProperty(key)) {
      registerData[key] = value
      this.setState({ registerData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.isValid()) {
      this.props.actions.register(this.state.registerData)
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
    let data = Object.assign({}, this.state.registerData)
    let validationErrors = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }

    const onError = (field, errMsg) => {
      validationErrors[field] = errMsg
      valid = false
    }

    // validate username -> required
    if (validator.isEmpty(data.username)) {
      onError('username', valErrs.required)
    }

    // validate email -> required, must be email
    if (validator.isEmpty(data.email)) {
      onError('email', valErrs.required)
    } else if (!validator.isEmail(data.email)) {
      onError('email', valErrs.email)
    }

    // validate password -> required, min 8 digits
    if (validator.isEmpty(data.password)) {
      onError('password', valErrs.required)
    } else if (!validator.isLength(data.password, { min: 8 })) {
      onError('password', valErrs.length(8))
    }

    // validate passwordConfirm -> required, must match password
    if (validator.isEmpty(data.passwordConfirm)) {
      onError('passwordConfirm', valErrs.required)
    } else if (!validator.equals(data.passwordConfirm, data.password)) {
      onError('passwordConfirm', valErrs.passwordConfirm)
    }

    this.setState({ validationErrors })
    return valid
  }

  render () {
    const { apiError } = this.props
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>Register</h2>

        {apiError &&
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{apiError}</p>
          </Message>
        }

        <RegisterForm
          working={this.props.ajaxPending}
          registerData={this.state.registerData}
          errors={this.state.validationErrors}
          changed={e => this.handleChange(e)}
          submitted={e => this.handleSubmit(e)}
        />
      </Segment>
    )
  }
}

RegisterPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RegisterPage
