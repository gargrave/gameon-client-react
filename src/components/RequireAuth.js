import React from 'react'
import PropTypes from 'prop-types'

const RequireAuth = (Component) => {
  return class extends React.Component {
    static propTypes = {
      router: PropTypes.object,
      initializing: PropTypes.bool,
      loggedIn: PropTypes.bool
    }

    componentWillReceiveProps (nextProps) {
      // if we are finished initializing and still not logged in,
      // it is time to redirect to the login page
      if (this.props.initializing && !nextProps.initializing) {
        if (!this.props.loggedIn) {
          this.props.router.replace('/account/login')
        }
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }
}

export default RequireAuth
