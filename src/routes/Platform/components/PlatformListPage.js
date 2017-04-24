import React from 'react'
import PropTypes from 'prop-types'

import RequireAuth from '../../../components/RequireAuth'

class PlatformListPage extends React.Component {
  componentDidMount () {
    console.log('componentDidMount')
    console.log('this.props.children:')
    console.log(this.props.children)
    this.props.actions.fetchPlatforms()
  }

  render () {
    return (
      <div>
        <h2>Platform List Page</h2>
        {!this.props.children && <h3>no children</h3>}
        {!!this.props.children && this.props.children}
      </div>
    )
  }
}

PlatformListPage.propTypes = {
  children: PropTypes.object,
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RequireAuth(PlatformListPage)
