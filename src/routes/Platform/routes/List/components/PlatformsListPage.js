import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class PlatformListPage extends React.Component {
  componentDidMount () {
    this.props.actions.fetchPlatforms()
  }

  render () {
    return (
      <div>
        <h2>Platforms List Page</h2>
        <Link to='/platforms/35'>Test Detail Page</Link>
      </div>
    )
  }
}

PlatformListPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default PlatformListPage
