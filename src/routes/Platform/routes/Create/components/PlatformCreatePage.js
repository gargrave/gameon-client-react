import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import PlatformForm from '../../../components/PlatformForm'

class PlatformCreatePage extends React.Component {
  render () {
    return (
      <Segment className='segment-card'>
        <h2 className='page-title'>Add a Platform</h2>

        <PlatformForm
          working={false}
          platformData={{ title: '' }}
          errors={{ title:'' }}
          onChange={() => {}}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Segment>
    )
  }
}

PlatformCreatePage.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired,
  readyToLoad: PropTypes.bool.isRequired
}

export default PlatformCreatePage
