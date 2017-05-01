import React from 'react'
import PropTypes from 'prop-types'

import { Button, Dimmer, Form, Loader } from 'semantic-ui-react'

const LoginForm = (props) => (
  <div>
    <Form>

      <Dimmer inverted active={props.working}>
        <Loader inverted>Working...</Loader>
      </Dimmer>

      <Form.Field required
        className='login-form'
        error={!!props.errors.username}>
        <label htmlFor='username'>Username</label>
        {!!props.errors.username &&
          <p className='form-error' id='login-username-error'>{props.errors.username}</p>
        }
        <input
          type='text'
          id='login-username'
          name='username'
          placeholder='Username'
          value={props.loginData.username}
          onChange={props.changed}
        />

      </Form.Field>

      <Form.Field required
        error={!!props.errors.password}>
        <label htmlFor='password'>Password</label>
        {!!props.errors.password &&
          <p className='form-error' id='login-password-error'>{props.errors.password}</p>
        }
        <input
          type='password'
          id='login-password'
          name='password'
          placeholder='Password'
          value={props.loginData.password}
          onChange={props.changed}
        />
      </Form.Field>

      <Button
        primary
        id='login-submit'
        type='submit'
        onClick={props.submitted}>
        Submit
      </Button>

    </Form>
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
