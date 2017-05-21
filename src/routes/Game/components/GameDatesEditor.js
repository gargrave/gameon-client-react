import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'material-ui/DatePicker'

const renderDateItem = (d) => {
  return (
    <li key={d}>{d}</li>
  )
}

const GameForm = (props) => (
  <div>
    <DatePicker
      fullWidth
      hintText='Add a Date'
      disabled={props.working}
      onChange={props.onDateSelect}
    />

    <ul>
      {props.gameData.dates.map(d => renderDateItem(d))}
    </ul>
  </div>
)

GameForm.propTypes = {
  working: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  onDateSelect: PropTypes.func.isRequired
}

export default GameForm
