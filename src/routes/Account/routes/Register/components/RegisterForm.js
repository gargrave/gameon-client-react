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
          <p className='form-error'>{props.errors.username}</p>
        }
        <input
          type='text'
          id='username'
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
          <p className='form-error'>{props.errors.email}</p>
        }
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          value={props.registerData.email}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field required
        error={!!props.errors.password}>
        <label htmlFor='password'>Password</label>
        {!!props.errors.password &&
          <p className='form-error'>{props.errors.password}</p>
        }
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={props.registerData.password}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field required
        error={!!props.errors.passwordConfirm}>
        <label htmlFor='passwordConfirm'>Re-enter Password</label>
        {!!props.errors.passwordConfirm &&
          <p className='form-error'>{props.errors.passwordConfirm}</p>
        }
        <input
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          placeholder='Re-enter Password'
          value={props.registerData.passwordConfirm}
          onChange={props.changed}
        />
      </Form.Field>

      <Button
        primary
        type='submit'
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
