import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const RegisterForm = (props) => (
  <div>
    <form id='register-form'>

      {props.working && <p>Working...</p>}

      <TextField
        fullWidth
        id='register-input-username'
        name='username'
        hintText='Username'
        floatingLabelText='Username'
        disabled={props.working}
        errorText={props.errors.username}
        value={props.registerData.username}
        onChange={props.changed}
      />

      <TextField
        fullWidth
        type='email'
        id='register-input-email'
        name='email'
        hintText='Email'
        floatingLabelText='Email'
        disabled={props.working}
        errorText={props.errors.email}
        value={props.registerData.email}
        onChange={props.changed}
      />

      <TextField
        fullWidth
        type='password'
        id='register-input-password1'
        name='password1'
        hintText='Password'
        floatingLabelText='Password'
        disabled={props.working}
        errorText={props.errors.password1}
        value={props.registerData.password1}
        onChange={props.changed}
      />

      <TextField
        fullWidth
        type='password'
        id='register-input-password2'
        name='password2'
        hintText='Confirm Password'
        floatingLabelText='Confirm Password'
        disabled={props.working}
        errorText={props.errors.password2}
        value={props.registerData.password2}
        onChange={props.changed}
      />

      <RaisedButton
        primary
        id='register-btn-submit'
        className='go-btn'
        type='submit'
        label='Submit'
        disabled={props.working}
        onClick={props.submitted}
      />
    </form>
  </div>
)

RegisterForm.propTypes = {
  working: PropTypes.bool.isRequired,
  registerData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  changed: PropTypes.func.isRequired,
  submitted: PropTypes.func.isRequired
}

export default RegisterForm
