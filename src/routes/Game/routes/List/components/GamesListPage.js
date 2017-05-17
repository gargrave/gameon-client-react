import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { localUrls } from '../../../../../globals/urls'

class GameListPage extends React.Component {
  componentDidMount () {
    if (this.props.readyToLoad && !this.props.games.length) {
      this.refreshList()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.readyToLoad && !this.props.games.length) {
      this.refreshList()
    }
  }

  refreshList () {
    this.props.actions.fetchGames()
  }

  handleAddGameClick (event) {
    event.preventDefault()
    this.props.router.push(localUrls.gameCreate)
  }

  handleGameClick (event, id) {
    event.preventDefault()
    this.props.router.push(`/games/${id}`)
  }

  renderGame (p) {
    return (
      <Paper
        key={p.id}
        className='go-paper  pointer'
        onClick={e => this.handleGameClick(e, p.id)}>
        {p.title}
      </Paper>
    )
  }

  render () {
    return (
      <div>
        <h2>My Games</h2>
        <RaisedButton
          primary
          label='Add a Game'
          onClick={e => this.handleAddGameClick(e)}
        />
        {this.props.games.map(p => this.renderGame(p))}
      </div>
    )
  }
}

GameListPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  games: PropTypes.array.isRequired
}

export default GameListPage
