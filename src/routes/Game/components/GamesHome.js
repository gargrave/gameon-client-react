import React from 'react'
import PropTypes from 'prop-types'

import RequireAuth from '../../../components/RequireAuth'
import GamesListContainer from '../routes/List/containers/GamesListContainer'

class GamesHome extends React.Component {
  render () {
    return (
      <div>
        {this.props.children ? this.props.children
          : <GamesListContainer {...this.props} />
        }
      </div>
    )
  }
}

GamesHome.propTypes = {
  children: PropTypes.object,
  router: PropTypes.object,
  actions: PropTypes.object.isRequired,
  ajaxPending: PropTypes.bool.isRequired
}

export default RequireAuth(GamesHome)
