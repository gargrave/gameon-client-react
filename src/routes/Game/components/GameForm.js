import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

const renderPlatformOption = (p) => {
  return <MenuItem key={p.id} value={p.id} primaryText={p.title} />
}

const GameForm = (props) => (
  <div>
    <form id='game-form'>

      {props.working && <p>Working...</p>}

      <TextField
        fullWidth
        required
        id='game-input-title'
        name='title'
        hintText='Title'
        floatingLabelText='Title'
        errorText={props.errors.title}
        value={props.gameData.title}
        onChange={props.onChange}
      />

      <SelectField
        fullWidth
        floatingLabelText='Platform'
        value={props.gameData.platform}
        onChange={props.onSelect}
      >
        {props.platforms.map(p => renderPlatformOption(p))}
      </SelectField>

      <Checkbox
        label='Finished'
        id='game-input-finished'
        name='finished'
        defaultChecked={props.gameData.finished}
        onCheck={props.onCheck}
      />

      <hr />

      <RaisedButton
        primary
        id='game-btn-submit'
        className='go-btn'
        type='submit'
        label='Submit'
        disabled={props.disabled}
        onClick={props.onSubmit}
      />

      <RaisedButton
        id='game-btn-cancel'
        className='go-btn'
        label='Cancel'
        onClick={props.onCancel}
      />

      {props.onDelete &&
        <RaisedButton
          secondary
          id='game-btn-delete'
          className='go-btn'
          label='Delete'
          onClick={props.onDelete}
        />
      }
    </form>
  </div>
)

GameForm.propTypes = {
  working: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  platforms: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export default GameForm
