import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import { localUrls } from '../../../../../globals/urls'
import platformBuilder from '../../../utils/platformBuilder'
import { compare, validate } from '../../../utils/platformValidator'

import ConfirmModal from '../../../../../components/ConfirmModal'
import RequireAuth from '../../../../../components/RequireAuth'
import PlatformDetailView from './PlatformDetailView'
import PlatformForm from '../../../components/PlatformForm'

class PlatformDetailPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      disableForm: false,
      showDeleteModal: false,
      platformData: {
        title: ''
      },
      validationErrors: {
        title: ''
      }
    }
  }

  componentDidMount () {
    if (this.props.readyToLoad && !this.props.platform.id) {
      this.refreshPlatform()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.readyToLoad && !this.props.platform.id) {
      this.refreshPlatform()
    }
  }

  refreshPlatform () {
    const id = this.props.params.id
    const router = this.props.router

    if (!id) {
      router.push(localUrls.platformsList)
    } else {
      this.props.actions.fetchPlatforms()
    }
  }

  enterEditingState (event) {
    event.preventDefault()
    this.setState({
      editing: true,
      disableForm: true,
      platformData: Object.assign({}, this.props.platform)
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
    let platformData = Object.assign({}, this.state.platformData)
    const key = event.target.name
    const value = event.target.value

    if (key in platformData) {
      platformData[key] = value
      this.setState({
        platformData,
        disableForm: compare(platformData, this.props.platform)
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    const platform = platformBuilder.buildForUpdate(this.state.platformData)
    const val = validate(platform)
    this.setState({ validationErrors: val.errors })

    if (val.valid) {
      this.props.actions.updatePlatform(platform)
        .then(platform => {
          this.exitEditingState()
        }, () => { })
    }
  }

  handleBackClick (event) {
    event.preventDefault()
    this.props.router.push(localUrls.platformsList)
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
    console.log('*****\nTODO: Implement Platform Delete functionality!\n*****')
  }

  render () {
    const { ajaxPending, platform } = this.props
    const { editing, disableForm, platformData, validationErrors } = this.state
    const working = !this.props.readyToLoad || this.props.ajaxPending

    return (
      <Paper className='go-paper'>
        <ConfirmModal
          headerText='Delete Platform'
          contentText='Are you sure you want to delete this Platform?'
          showing={this.state.showDeleteModal}
          onConfirm={e => this.handleDelete(e)}
          onCancel={e => this.closeDeleteDialog(e)}
        />

        <h2 className='page-title'>{platform.title}</h2>

        {working && <p>Working...</p>}

        {editing && this.props.apiError &&
          <div id='platform-api-error'>
            <p>Error</p>
            <p>{this.props.apiError}</p>
          </div>
        }

        {!editing &&
          <PlatformDetailView
            platform={platform}
            onEditClick={e => this.enterEditingState(e)}
            onBackClick={e => this.handleBackClick(e)}
          />
        }

        {editing &&
          <PlatformForm
            working={ajaxPending}
            platformData={platformData}
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

PlatformDetailPage.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  platform: PropTypes.object.isRequired
}

export default RequireAuth(PlatformDetailPage)
