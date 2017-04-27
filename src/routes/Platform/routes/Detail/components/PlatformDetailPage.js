import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'

import RequireAuth from '../../../../../components/RequireAuth'

class PlatformDetailPage extends React.Component {
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

    if (!id) {
      this.goToListPage()
    } else {
      this.props.actions.fetchPlatforms()
    }
  }

  goToListPage () {
    this.props.router.push(`/platforms`)
  }

  handleBackClick (event) {
    event.preventDefault()
    this.props.router.push(localUrls.platformsList)
  }

  render () {
    let working = !this.props.readyToLoad || this.props.ajaxPending
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>{this.props.platform.title}</h2>

        <hr />
        <Button onClick={e => this.handleBackClick(e)}>Back</Button>

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
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  platform: PropTypes.object.isRequired
}

export default RequireAuth(PlatformDetailPage)
