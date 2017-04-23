import React from 'react'
import PropTypes from 'prop-types'

import { Button, Dimmer, Form, Loader } from 'semantic-ui-react'

const LoginForm = (props) => (
  <div>
    <Form>

      <Dimmer inverted active={props.working}>
        <Loader inverted>Working...</Loader>
      </Dimmer>

      <Form.Field>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='Username'
          value={props.state.username}
          onChange={props.changed}
        />
      </Form.Field>

      <Form.Field>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={props.state.password}
          onChange={props.changed}
        />
      </Form.Field>

      <Button
        type='submit'
        onClick={props.submitted}>
        Submit
      </Button>

    </Form>
  </div>
)

LoginForm.propTypes = {
  working: PropTypes.bool.isRequired,
  state: PropTypes.object.isRequired,
  changed: PropTypes.func.isRequired,
  submitted: PropTypes.func.isRequired
}

export default LoginForm
