import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const PlatformForm = (props) => (
  <div>
    <form id='platform-form'>

      {props.working && <p>Working...</p>}

      <TextField
        fullWidth
        required
        id='platform-input-title'
        name='title'
        hintText='Title'
        floatingLabelText='Title'
        errorText={props.errors.title}
        value={props.platformData.title}
        onChange={props.onChange}
      />

      <hr />

      <RaisedButton
        primary
        id='platform-btn-submit'
        className='go-btn'
        type='submit'
        label='Submit'
        disabled={props.disabled}
        onClick={props.onSubmit}
      />

      <RaisedButton
        id='platform-btn-cancel'
        className='go-btn'
        label='Cancel'
        onClick={props.onCancel}
      />

      {props.onDelete &&
        <RaisedButton
          secondary
          id='platform-btn-delete'
          className='go-btn'
          label='Delete'
          onClick={props.onDelete}
        />
      }
    </form>
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
