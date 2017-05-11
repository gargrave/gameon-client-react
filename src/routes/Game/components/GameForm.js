import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Form, Loader } from 'semantic-ui-react'

const GameForm = (props) => (
  <div>
    <Form id='game-form'>

      <Dimmer inverted active={props.working}>
        <Loader inverted>Working...</Loader>
      </Dimmer>

      <Form.Field required
        error={!!props.errors.title}>
        <label htmlFor='title'>Title</label>
        {!!props.errors.title &&
          <p className='form-error' id='game-title-error'>{props.errors.title}</p>
        }
        <input
          type='text'
          id='game-title'
          name='title'
          placeholder='title'
          value={props.gameData.title}
          onChange={props.onChange}
        />
      </Form.Field>

      <hr />

      <Button
        primary
        id='game-submit'
        type='submit'
        disabled={props.disabled}
        onClick={props.onSubmit}>
        Submit
      </Button>

      <Button
        id='game-cancel'
        onClick={props.onCancel}>
        Cancel
      </Button>

      {props.onDelete &&
        <Button
          negative
          id='game-delete'
          floated='right'
          onClick={props.onDelete}>
          Delete
        </Button>
      }

    </Form>
  </div>
)

GameForm.propTypes = {
  working: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export default GameForm
