import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

class GameDetailView extends React.Component {
  render () {
    const { game, onEditClick, onBackClick } = this.props

    return (
      <div>
        <p><strong>Title: </strong>{game.title}</p>
        <p><strong>Added on: </strong>{game.created}</p>

        <hr />

        <RaisedButton
          primary
          className='go-btn'
          label='Edit'
          onClick={onEditClick}
        />

        <RaisedButton
          className='go-btn'
          label='Back'
          onClick={onBackClick}
        />
      </div>
    )
  }
}

GameDetailView.propTypes = {
  game: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default GameDetailView
