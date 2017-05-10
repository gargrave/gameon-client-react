import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Form, Loader } from 'semantic-ui-react'

const PlatformForm = (props) => (
  <div>
    <Form id='platform-form'>

      <Dimmer inverted active={props.working}>
        <Loader inverted>Working...</Loader>
      </Dimmer>

      <Form.Field required
        error={!!props.errors.title}>
        <label htmlFor='title'>Title</label>
        {!!props.errors.title &&
          <p className='form-error' id='platform-title-error'>{props.errors.title}</p>
        }
        <input
          type='text'
          id='platform-title'
          name='title'
          placeholder='title'
          value={props.platformData.title}
          onChange={props.onChange}
        />
      </Form.Field>

      <hr />

      <Button
        primary
        id='platform-submit'
        type='submit'
        disabled={props.disabled}
        onClick={props.onSubmit}>
        Submit
      </Button>

      <Button
        id='platform-cancel'
        onClick={props.onCancel}>
        Cancel
      </Button>

      {props.onDelete &&
        <Button
          negative
          id='platform-delete'
          floated='right'
          onClick={props.onDelete}>
          Delete
        </Button>
      }

    </Form>
  </div>
)

PlatformForm.propTypes = {
  working: PropTypes.bool.isRequired,
  platformData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export default PlatformForm
