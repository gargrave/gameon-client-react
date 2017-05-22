import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Paper from 'material-ui/Paper'

import { localUrls } from '../../../../../globals/urls'
import GameModel from '../../../../../models/game'
import { compare, validate } from '../../../utils/gameValidator'

import ConfirmDialog from '../../../../../components/ConfirmDialog'
import RequireAuth from '../../../../../components/RequireAuth'
import Alert from '../../../../../components/Common/Alert'
import GameDetailView from './GameDetailView'
import GameForm from '../../../components/GameForm'

class GameDetailPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      disableForm: false,
      deleteDialogShowing: false,
      gameData: {
        title: ''
      },
      validationErrors: {
        title: ''
      },
      datesAdded: [],
      datesRemoved: []
    }
  }

  componentDidMount () {
    if (this.props.readyToLoad && !this.props.game.id) {
      this.refreshGame()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.readyToLoad && !this.props.game.id) {
      this.refreshGame()
    }
  }

  refreshGame () {
    const id = this.props.params.id
    const router = this.props.router

    if (!id) {
      router.push(localUrls.gamesList)
    } else {
      this.props.actions.fetchGames()
    }
  }

  enterEditingState (event) {
    event.preventDefault()
    const platform = this.props.game.platform.id
    this.setState({
      editing: true,
      disableForm: true,
      gameData: Object.assign({},
        this.props.game,
        { platform }
      )
    })
  }

  exitEditingState (event) {
    if (event) {
      event.preventDefault()
    }
    this.setState({ editing: false })
  }

  handleChange (event) {
    let gameData = Object.assign({}, this.state.gameData)
    const key = event.target.name
    const value = event.target.value

    if (key in gameData) {
      gameData[key] = value
      this.setState({
        gameData,
        disableForm: compare(gameData, this.props.game)
      })
    }
  }

  handleSelect (event, key, payload) {
    let gameData = Object.assign({}, this.state.gameData)
    gameData.platform = payload
    this.setState({
      gameData,
      disableForm: compare(gameData, this.props.game)
    })
  }

  handleCheck (event, checked) {
    let gameData = Object.assign({}, this.state.gameData)
    const key = event.target.name

    if (key in gameData) {
      gameData[key] = checked
      this.setState({
        gameData,
        disableForm: compare(gameData, this.props.game)
      })
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
    let { datesAdded, datesRemoved } = this.state

    if (datesAdded.includes(date)) {
      gameData.dates = gameData.dates.filter(d => d !== date)
      datesAdded = datesAdded.filter(d => d !== date)
    } else if (datesRemoved.includes(date)) {
      datesRemoved = datesRemoved.filter(d => d !== date)
    } else {
      datesRemoved.push(date)
    }

    this.setState({
      gameData,
      datesAdded,
      datesRemoved
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    let tempGameData = Object.assign({}, this.state.gameData)
    tempGameData.datesRemoved = this.state.datesRemoved
    tempGameData.dates = tempGameData.dates.filter(d => {
      return !this.state.datesRemoved.includes(d)
    })

    const game = GameModel.toAPI(tempGameData)
    const { valid, errors } = validate(game)
    this.setState({ validationErrors: errors })

    if (valid) {
      this.props.actions.updateGame(game)
        .then(game => {
          this.exitEditingState()
        }, () => { })
    }
  }

  handleBackClick (event) {
    event.preventDefault()
    this.props.router.push(localUrls.gamesList)
  }

  handleDelete (event) {
    this.closeDeleteDialog(event)
    console.log('*****\nTODO: Implement Game Delete functionality!\n*****')
  }

  showDeleteDialog (event) {
    this.setState({ deleteDialogShowing: true })
  }

  closeDeleteDialog (event) {
    this.setState({ deleteDialogShowing: false })
  }

  render () {
    const { ajaxPending, game } = this.props
    const { editing, disableForm, gameData, validationErrors } = this.state
    const working = !this.props.readyToLoad || this.props.ajaxPending

    return (
      <Paper className='go-paper'>
        <ConfirmDialog
          title='Delete Game'
          content='Are you sure you want to delete this Game?'
          open={this.state.deleteDialogShowing}
          handleConfirm={e => this.handleDelete(e)}
          handleClose={e => this.closeDeleteDialog(e)}
        />

        <h2 className='page-title'>{game.title}</h2>

        {working && <p>Working...</p>}

        {editing && this.props.apiError &&
          <Alert
            id='game-api-error'
            title='Error'
            message={this.props.apiError}
          />
        }

        {!editing &&
          <GameDetailView
            game={game}
            onEditClick={e => this.enterEditingState(e)}
            onBackClick={e => this.handleBackClick(e)}
          />
        }

        {editing &&
          <GameForm
            working={ajaxPending}
            gameData={gameData}
            datesAdded={this.state.datesAdded}
            datesRemoved={this.state.datesRemoved}
            platforms={this.props.platforms}
            errors={validationErrors}
            disabled={disableForm}
            onChange={e => this.handleChange(e)}
            onCheck={(e, checked) => this.handleCheck(e, checked)}
            onSelect={(e, key, payload) => this.handleSelect(e, key, payload)}
            onDateSelect={(e, date) => this.handleDateSelect(e, date)}
            onDateClick={date => this.handleDateClick(date)}
            onSubmit={e => this.handleSubmit(e)}
            onCancel={e => this.exitEditingState(e)}
            onDelete={e => this.showDeleteDialog(e)}
          />
        }
      </Paper>
    )
  }
}

GameDetailPage.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
  platforms: PropTypes.array.isRequired
}

export default RequireAuth(GameDetailPage)
