import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Segment } from 'semantic-ui-react'

import { localUrls } from '../../../../../globals/urls'

class PlatformListPage extends React.Component {
  componentDidMount () {
    if (this.props.readyToLoad && !this.props.platforms.length) {
      this.refreshList()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.readyToLoad && !this.props.platforms.length) {
      this.refreshList()
    }
  }

  refreshList () {
    this.props.actions.fetchPlatforms()
  }

  handleAddPlatformClick (event) {
    event.preventDefault()
    this.props.router.push(localUrls.platformCreate)
  }

  handlePlatformClick (event, id) {
    event.preventDefault()
    this.props.router.push(`/platforms/${id}`)
  }

  renderPlatform (p) {
    return (
      <Segment
        key={p.id}
        className='segment-card pointer'
        onClick={e => this.handlePlatformClick(e, p.id)}>
        {p.title}
      </Segment>
    )
  }

  render () {
    return (
      <div>
        <Header as='h2'>My Platforms</Header>
        <Button primary onClick={e => this.handleAddPlatformClick(e)}>Add a Platform</Button>
        {this.props.platforms.map(p => this.renderPlatform(p))}
      </div>
    )
  }
}

PlatformListPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired,
  platforms: PropTypes.array.isRequired
}

export default PlatformListPage
