import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const LoginForm = (props) => (
  <div>
    <form id='login-form'>

      {props.working && <p>Working...</p>}

      <TextField
        fullWidth
        id='login-username'
        name='username'
        hintText='Username'
        floatingLabelText='Username'
        errorText={props.errors.username}
        value={props.loginData.username}
        onChange={props.changed}
      />

      <TextField
        type='password'
        fullWidth
        id='login-password'
        name='password'
        hintText='Password'
        floatingLabelText='Password'
        errorText={props.errors.password}
        value={props.loginData.password}
        onChange={props.changed}
      />

      <RaisedButton
        primary
        id='login-submit'
        type='submit'
        label='Submit'
        onClick={props.submitted}
      />

    </form>
  </div>
)

LoginForm.propTypes = {
  working: PropTypes.bool.isRequired,
  loginData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  changed: PropTypes.func.isRequired,
  submitted: PropTypes.func.isRequired
}

export default LoginForm
