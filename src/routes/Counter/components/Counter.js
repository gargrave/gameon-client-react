import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Form, Loader, Segment } from 'semantic-ui-react'

class Counter extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      username: ''
    }
  }

  onFormChange = event => {
    event.preventDefault()
    this.setState({ username: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.checkUser(this.state.username)
  }

  render () {
    return (
      <div style={{ margin: '0 auto' }} >
        <h2 className='counter-display'>Counter: {this.props.counter}</h2>

        <Button
          primary
          className='increment-button'
          onClick={this.props.increment}
        >
          Increment
        </Button>
        {' '}
        <Button
          secondary
          className='double-button'
          onClick={this.props.doubleAsync}
        >
          Double (Async)
        </Button>

        <hr style={{ margin: '20px' }} />

        <Segment>
          <Dimmer active={this.props.ajaxPending}>
            <Loader content='Checking...' />
          </Dimmer>

          <Form>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder='Username'
                name='username'
                style={{ maxWidth: '200px' }}
                value={this.state.username}
                onChange={this.onFormChange}
              />
            </Form.Field>
            {this.props.usernameTaken && <p style={{ color: 'red' }}>Username is taken.</p>}
            {this.props.usernameAvailable && <p style={{ color: 'green' }}>Username is availble.</p>}
            <Button type='submit' onClick={this.onSubmit}>Submit</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

Counter.propTypes = {
  ajaxPending: PropTypes.bool.isRequired,
  usernameTaken: PropTypes.bool.isRequired,
  usernameAvailable: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired
}

export default Counter
