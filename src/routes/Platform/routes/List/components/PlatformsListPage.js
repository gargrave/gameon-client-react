import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

class PlatformListPage extends React.Component {
  componentDidMount () {
    this.props.actions.fetchPlatforms()
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
        <h2>My Platforms</h2>
        {this.props.platforms.map(p => this.renderPlatform(p))}
      </div>
    )
  }
}

PlatformListPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  platforms: PropTypes.array.isRequired
}

export default PlatformListPage
