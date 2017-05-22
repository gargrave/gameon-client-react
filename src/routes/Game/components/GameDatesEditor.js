import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'material-ui/DatePicker'
import { List, ListItem } from 'material-ui/List'

class GameForm extends React.Component {
  renderDatesList () {
    const { dates, datesAdded, datesRemoved } = this.props.gameData

    const getClass = (d) => {
      if (datesRemoved && datesRemoved.includes(d)) {
        return 'removed-date'
      } else if (datesAdded && datesAdded.includes(d)) {
        return 'new-date'
      }
    }

    return (
      <List>
        {dates.map(d => {
          return (
            <ListItem
              key={d}
              className={getClass(d)}
              primaryText={d}
              onTouchTap={() => this.props.onDateClick(d)}
            />
          )
        })}
      </List>
    )
  }

  render () {
    return (
      <div>
        <DatePicker
          fullWidth
          hintText='Add a Date'
          disabled={this.props.working}
          onChange={this.props.onDateSelect}
        />

        {this.renderDatesList()}
      </div>
    )
  }
}

GameForm.propTypes = {
  working: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  onDateSelect: PropTypes.func.isRequired,
  onDateClick: PropTypes.func
}

export default GameForm
