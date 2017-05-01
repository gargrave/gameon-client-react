import React from 'react'
import PropTypes from 'prop-types'

import { Button, Dimmer, Form, Loader } from 'semantic-ui-react'

const RegisterForm = (props) => (
  <div>
    <Form>

      <Dimmer inverted active={props.working}>
        <Loader inverted>Working...</Loader>
      </Dimmer>

      <Form.Field required
        error={!!props.errors.username}>
        <label htmlFor='username'>Username</label>
        {!!props.errors.username &&
          <p className='form-error' id='register-username-error'>{props.errors.username}</p>
        }
        <input
          type='text'
          id='register-username'
          name='username'
          placeholder='Username'
          value={props.registerData.username}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field required
        error={!!props.errors.email}>
        <label htmlFor='email'>Email</label>
        {!!props.errors.email &&
          <p className='form-error' id='register-email-error'>{props.errors.email}</p>
        }
        <input
          type='email'
          id='register-email'
          name='email'
          placeholder='Email'
          value={props.registerData.email}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field required
        error={!!props.errors.password1}>
        <label htmlFor='password'>Password</label>
        {!!props.errors.password1 &&
          <p className='form-error' id='register-password1-error'>{props.errors.password1}</p>
        }
        <input
          type='password'
          id='register-password1'
          name='password1'
          placeholder='Password'
          value={props.registerData.password1}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field required
        error={!!props.errors.password2}>
        <label htmlFor='password2'>Re-enter Password</label>
        {!!props.errors.password2 &&
          <p className='form-error' id='register-password2-error'>{props.errors.password2}</p>
        }
        <input
          type='password'
          id='register-password2'
          name='password2'
          placeholder='Re-enter Password'
          value={props.registerData.password2}
          onChange={props.changed}
        />
      </Form.Field>

      <Button
        primary
        type='submit'
        id='register-submit'
        onClick={props.submitted}>
        Submit
      </Button>

    </Form>
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
