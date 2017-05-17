import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

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
      <Paper
        key={p.id}
        className='go-paper pointer'
        onClick={e => this.handlePlatformClick(e, p.id)}>
        {p.title}
      </Paper>
    )
  }

  render () {
    return (
      <div>
        <h2>My Platforms</h2>
        <RaisedButton
          primary
          label='Add a Platform'
          onClick={e => this.handleAddPlatformClick(e)}
        />
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
