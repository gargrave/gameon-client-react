import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader, Message, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'
import platformBuilder from '../../../utils/platformBuilder'
import { compare, validate } from '../../../utils/platformValidator'

import RequireAuth from '../../../../../components/RequireAuth'
import PlatformDetailView from './PlatformDetailView'
import PlatformForm from '../../../components/PlatformForm'

class PlatformDetailPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      disableForm: false,
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

    if (platformData.hasOwnProperty(key)) {
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

  render () {
    const { ajaxPending, platform } = this.props
    const { editing, disableForm, platformData, validationErrors } = this.state
    const working = !this.props.readyToLoad || this.props.ajaxPending

    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>{platform.title}</h2>

        {editing && this.props.apiError &&
          <Message negative className='platform-api-error'>
            <Message.Header>Error</Message.Header>
            <p>{this.props.apiError}</p>
          </Message>
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
          />
        }

        <Dimmer inverted active={working}>
          <Loader inverted>Working...</Loader>
        </Dimmer>
      </Segment>
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
