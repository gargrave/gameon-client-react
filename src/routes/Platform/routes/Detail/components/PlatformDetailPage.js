import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import RequireAuth from '../../../../../components/RequireAuth'

class PlatformDetailPage extends React.Component {
  render () {
    return (
      <Segment style={{ maxWidth: 600, margin: 'auto' }}>
        <h2>Platform Detail Page</h2>
      </Segment>
    )
  }
}

PlatformDetailPage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RequireAuth(PlatformDetailPage)
