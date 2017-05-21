import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'

import Paper from 'material-ui/Paper'

import { valErrs } from '../../../../../globals/errors'
import { localUrls } from '../../../../../globals/urls'

import Alert from '../../../../../components/Common/Alert'
import RegisterForm from '../components/RegisterForm'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      registerData: {
        username: '',
        email: '',
        password1: '',
        password2: ''
      },
      validationErrors: {
        username: '',
        email: '',
        password1: '',
        password2: ''
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
      const { register, fetchUser } = this.props.actions
      register(this.state.registerData).then(() => {
        fetchUser().then(() => {
          this.props.router.replace(localUrls.profile)
        })
      })
    }
  }

  isValid () {
    let valid = true
    let data = Object.assign({}, this.state.registerData)
    let validationErrors = {
      username: '',
      email: '',
      password1: '',
      password2: ''
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

    // validate password1 -> required, min 8 digits
    if (validator.isEmpty(data.password1)) {
      onError('password1', valErrs.required)
    } else if (!validator.isLength(data.password1, { min: 8 })) {
      onError('password1', valErrs.length(8))
    }

    // validate password2 -> required, must match password1
    if (validator.isEmpty(data.password2)) {
      onError('password2', valErrs.required)
    } else if (!validator.equals(data.password2, data.password1)) {
      onError('password2', valErrs.passwordConfirm)
    }

    this.setState({ validationErrors })
    return valid
  }

  render () {
    return (
      <Paper className='go-paper'>
        <h2 className='page-title'>Register</h2>

        {this.props.apiError &&
          <Alert
            id='register-api-error'
            title='Registration Error'
            message={this.props.apiError}
          />
        }

        <RegisterForm
          working={this.props.ajaxPending}
          registerData={this.state.registerData}
          errors={this.state.validationErrors}
          changed={e => this.handleChange(e)}
          submitted={e => this.handleSubmit(e)}
        />
      </Paper>
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
