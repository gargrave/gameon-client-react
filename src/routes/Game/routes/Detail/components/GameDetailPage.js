import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'

import { localUrls } from '../../../../../globals/urls'
import gameBuilder from '../../../utils/gameBuilder'
import { compare, validate } from '../../../utils/gameValidator'

import ConfirmModal from '../../../../../components/ConfirmModal'
import RequireAuth from '../../../../../components/RequireAuth'
import GameDetailView from './GameDetailView'
import GameForm from '../../../components/GameForm'

class GameDetailPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      disableForm: false,
      showDeleteModal: false,
      gameData: {
        title: ''
      },
      validationErrors: {
        title: ''
      }
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
    this.setState({
      editing: true,
      disableForm: true,
      gameData: Object.assign({}, this.props.game)
    })
  }

  exitEditingState (event) {
    if (event) {
      event.preventDefault()
    }
    this.setState({ editing: false })
  }

  handleChange (event) {
    event.preventDefault()
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

  handleSubmit (event) {
    event.preventDefault()
    const game = gameBuilder.buildForUpdate(this.state.gameData)
    const val = validate(game)
    this.setState({ validationErrors: val.errors })

    if (val.valid) {
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

  showDeleteModal (event) {
    event.preventDefault()
    this.setState({ showDeleteModal: true })
  }

  handleDelete (event) {
    event.preventDefault()
    this.closeDeleteDialog(event)
  }

  closeDeleteDialog (event) {
    event.preventDefault()
    this.setState({ showDeleteModal: false })
    console.log('*****\nTODO: Implement Game Delete functionality!\n*****')
  }

  render () {
    const { ajaxPending, game } = this.props
    const { editing, disableForm, gameData, validationErrors } = this.state
    const working = !this.props.readyToLoad || this.props.ajaxPending

    return (
      <Paper className='go-paper'>
        <ConfirmModal
          headerText='Delete Game'
          contentText='Are you sure you want to delete this Game?'
          showing={this.state.showDeleteModal}
          onConfirm={e => this.handleDelete(e)}
          onCancel={e => this.closeDeleteDialog(e)}
        />

        <h2 className='page-title'>{game.title}</h2>

        {working && <p>Working...</p>}

        {editing && this.props.apiError &&
          <div id='game-api-error'>
            <p>Error</p>
            <p>{this.props.apiError}</p>
          </div>
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
            errors={validationErrors}
            disabled={disableForm}
            onChange={e => this.handleChange(e)}
            onSubmit={e => this.handleSubmit(e)}
            onCancel={e => this.exitEditingState(e)}
            onDelete={e => this.showDeleteModal(e)}
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
  game: PropTypes.object.isRequired
}

export default RequireAuth(GameDetailPage)
