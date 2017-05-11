import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class GameDetailView extends React.Component {
  render () {
    const { game, onEditClick, onBackClick } = this.props

    return (
      <div>
        <p><strong>Title: </strong>{game.title}</p>
        <p><strong>Added on: </strong>{game.created}</p>

        <hr />
        <Button primary onClick={onEditClick}>Edit</Button>
        <Button onClick={onBackClick}>Back</Button>
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
