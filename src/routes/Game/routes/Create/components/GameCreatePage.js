import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Paper from 'material-ui/Paper'

import { localUrls } from '../../../../../globals/urls'
import GameModel from '../../../../../models/game'
import { validate } from '../../../utils/gameValidator'

import Alert from '../../../../../components/Common/Alert'
import GameForm from '../../../components/GameForm'

class GameCreatePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      disableForm: false,
      gameData: GameModel.empty(),
      validationErrors: GameModel.emptyValidationErrors(),
      datesAdded: []
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
    let dateStr = moment(date).format('YYYY-MM-DD')

    if (!this.state.datesAdded.includes(dateStr)) {
      let gameData = Object.assign({}, this.state.gameData)
      let datesAdded = [...this.state.datesAdded, dateStr]

      gameData.dates.push(dateStr)
      gameData.dates.sort().reverse()

      this.setState({
        gameData,
        datesAdded
      })
    }
  }

  handleDateClick (date) {
    let gameData = Object.assign({}, this.state.gameData)
    let { datesAdded } = this.state

    if (datesAdded.includes(date)) {
      gameData.dates = gameData.dates.filter(d => d !== date)
      datesAdded = datesAdded.filter(d => d !== date)
    }

    this.setState({
      gameData,
      datesAdded
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const game = this.state.gameData
    const { errors, valid } = validate(game)
    this.setState({ validationErrors: errors })

    if (valid) {
      this.props.actions.createGame(game)
        .then(game => {
          this.props.router.push(`${localUrls.gamesList}/${game.id}`)
        }, () => {})
    }
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
          datesAdded={this.state.datesAdded}
          platforms={this.props.platforms}
          errors={this.state.validationErrors}
          disabled={this.state.disableForm}
          onChange={e => this.handleChange(e)}
          onCheck={(e, checked) => this.handleCheck(e, checked)}
          onSelect={(e, key, payload) => this.handleSelect(e, key, payload)}
          onDateSelect={(e, date) => this.handleDateSelect(e, date)}
          onDateClick={date => this.handleDateClick(date)}
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
