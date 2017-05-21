import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Paper from 'material-ui/Paper'

import { localUrls } from '../../../../../globals/urls'
import { validate } from '../../../utils/gameValidator'

import Alert from '../../../../../components/Common/Alert'
import GameForm from '../../../components/GameForm'

class GameCreatePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gameData: {
        title: '',
        platform: undefined,
        finished: false,
        dates: []
      },
      validationErrors: {
        title: '',
        platform: '',
        finished: '',
        dates: ''
      }
    }
  }

  handleChange (event) {
    let gameData = Object.assign({}, this.state.gameData)
    const key = event.target.name
    const value = event.target.value

    if (key in gameData) {
      gameData[key] = value
      this.setState({ gameData })
    }
  }

  handleSelect (event, key, payload) {
    let gameData = Object.assign({}, this.state.gameData)
    gameData.platform = payload
    this.setState({ gameData })
  }

  handleCheck (event, checked) {
    let gameData = Object.assign({}, this.state.gameData)
    const key = event.target.name

    if (key in gameData) {
      gameData[key] = checked
      this.setState({ gameData })
    }
  }

  handleDateSelect (event, date) {
    let gameData = Object.assign({}, this.state.gameData)
    let dateStr = moment(date).format('YYYY-MM-DD')

    if (!gameData.dates.includes(dateStr)) {
      gameData.dates.push(dateStr)
      this.setState({ gameData })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const game = this.state.gameData
    const val = validate(game)
    this.setState({ validationErrors: val.errors })
    console.log('game data:')
    console.log(game)

    // if (val.valid) {
    //   this.props.actions.createGame(game)
    //     .then(game => {
    //       this.props.router.push(`${localUrls.gamesList}/${game.id}`)
    //     }, () => {
    //     })
    // }
  }

  handleCancel (event) {
    event.preventDefault()
    this.props.router.push(localUrls.gamesList)
  }

  render () {
    return (
      <Paper className='go-paper'>
        <h2 className='page-title'>Add a Game</h2>

        {this.props.apiError &&
          <Alert
            id='game-api-error'
            title='Error'
            message={this.props.apiError}
          />
        }

        <GameForm
          working={this.props.ajaxPending}
          gameData={this.state.gameData}
          platforms={this.props.platforms}
          errors={this.state.validationErrors}
          onChange={e => this.handleChange(e)}
          onCheck={(e, checked) => this.handleCheck(e, checked)}
          onSelect={(e, key, payload) => this.handleSelect(e, key, payload)}
          onDateSelect={(e, date) => this.handleDateSelect(e, date)}
          onSubmit={e => this.handleSubmit(e)}
          onCancel={e => this.handleCancel(e)}
        />
      </Paper>
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
