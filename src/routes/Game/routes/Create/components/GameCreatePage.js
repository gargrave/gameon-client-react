import React from 'react'
import PropTypes from 'prop-types'
import { Message, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'
import { validate } from '../../../utils/gameValidator'

import GameForm from '../../../components/GameForm'

class GameCreatePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gameData: {
        title: '',
        platform: 0,
        finished: false
      },
      validationErrors: {
        title: '',
        platform: '',
        finished: ''
      }
    }
  }

  handleChange (event) {
    event.preventDefault()
    let gameData = Object.assign({}, this.state.gameData)
    const key = event.target.name
    const value = event.target.value

    if (key in gameData) {
      gameData[key] = value
      this.setState({ gameData })
    }
  }

  handleCheck (event, target) {
    event.preventDefault()
    let gameData = Object.assign({}, this.state.gameData)
    const key = target.name

    if (key in gameData) {
      gameData[key] = target.checked
      this.setState({ gameData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const game = this.state.gameData
    const val = validate(game)
    this.setState({ validationErrors: val.errors })

    if (val.valid) {
      this.props.actions.createGame(game)
        .then(game => {
          this.props.router.push(`${localUrls.gamesList}/${game.id}`)
        }, () => {
        })
    }
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.router.push(localUrls.gamesList)
  }

  render () {
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>Add a Game</h2>

        {this.props.apiError &&
          <Message negative className='game-api-error'>
            <Message.Header>Error</Message.Header>
            <p>{this.props.apiError}</p>
          </Message>
        }

        <GameForm
          working={this.props.ajaxPending}
          gameData={this.state.gameData}
          platforms={this.props.platforms}
          errors={this.state.validationErrors}
          onChange={e => this.handleChange(e)}
          onCheckChange={(e, target) => this.handleCheck(e, target)}
          onSubmit={e => this.handleSubmit(e)}
          onCancel={e => this.handleCancel(e)}
        />
      </Segment>
    )
  }
}

GameCreatePage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  platforms: PropTypes.array.isRequired
}

export default GameCreatePage
