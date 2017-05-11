import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Segment } from 'semantic-ui-react'

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
      <Segment
        key={p.id}
        className='segment-card pointer'
        onClick={e => this.handleGameClick(e, p.id)}>
        {p.title}
      </Segment>
    )
  }

  render () {
    return (
      <div>
        <Header as='h2'>My Games</Header>
        <Button primary onClick={e => this.handleAddGameClick(e)}>Add a Game</Button>
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
