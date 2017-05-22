import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { cloneDeep } from 'lodash'

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
      gameData: GameModel.empty(),
      validationErrors: GameModel.emptyValidationErrors()
    }
  }

  handleChange (event) {
    let gameData = cloneDeep(this.state.gameData)
    const key = event.target.name
    const value = event.target.value

    if (key in gameData) {
      gameData[key] = value
      this.setState({ gameData })
    }
  }

  handleSelect (event, key, payload) {
    let gameData = cloneDeep(this.state.gameData)
    gameData.platform = payload
    this.setState({ gameData })
  }

  handleCheck (event, checked) {
    let gameData = cloneDeep(this.state.gameData)
    const key = event.target.name

    if (key in gameData) {
      gameData[key] = checked
      this.setState({ gameData })
    }
  }

  handleDateSelect (event, date) {
    let dateStr = moment(date).format('YYYY-MM-DD')
    let gameData = cloneDeep(this.state.gameData)

    if (!gameData.datesAdded.includes(dateStr)) {
      gameData.datesAdded.push(dateStr)
      gameData.dates.push(dateStr)
      gameData.dates.sort().reverse()

      this.setState({ gameData })
    }
  }

  handleDateClick (date) {
    let gameData = cloneDeep(this.state.gameData)
    let add = gameData.datesAdded

    if (add.includes(date)) {
      gameData.dates = gameData.dates.filter(d => d !== date)
      gameData.datesAdded = add.filter(d => d !== date)
    }

    this.setState({ gameData })
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
          platforms={this.props.platforms}
          errors={this.state.validationErrors}
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
