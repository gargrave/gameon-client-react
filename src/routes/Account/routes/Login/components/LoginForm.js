import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const LoginForm = (props) => (
  <div>
    <form id='login-form'>

      {props.working && <p>Working...</p>}

      <TextField
        id='login-username'
        name='username'
        hintText='Username'
        floatingLabelText='Username'
        errorText={props.errors.username}
        fullWidth
        value={props.loginData.username}
        onChange={props.changed}
      />

      <TextField
        type='password'
        id='login-password'
        name='password'
        hintText='Password'
        floatingLabelText='Password'
        errorText={props.errors.password}
        fullWidth
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
