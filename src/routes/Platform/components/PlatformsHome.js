import React from 'react'
import PropTypes from 'prop-types'

import RequireAuth from '../../../components/RequireAuth'
import PlatformsListPage from '../routes/List/components/PlatformsListPage'

class PlatformsHome extends React.Component {
  render () {
    return (
      <div>
        {this.props.children ? this.props.children
          : <PlatformsListPage {...this.props} />
        }
      </div>
    )
  }
}

PlatformsHome.propTypes = {
  children: PropTypes.object,
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RequireAuth(PlatformsHome)
