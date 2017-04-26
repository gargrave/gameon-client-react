import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import RequireAuth from '../../../../../components/RequireAuth'

class PlatformDetailPage extends React.Component {
  render () {
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>{this.props.platform.title}</h2>
      </Segment>
    )
  }
}

PlatformDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  platform: PropTypes.object.isRequired
}

export default RequireAuth(PlatformDetailPage)
