import React from 'react'
import PropTypes from 'prop-types'

const RequireAuth = (Component) => {
  return class extends React.Component {
    static propTypes = {
      router: PropTypes.object,
      loggedIn: PropTypes.bool
    }

    componentWillMount () {
      if (!this.props.loggedIn) {
        this.props.router.replace('/account/login')
      }
    }

    render () {
      return <Component {...this.props} />
    }
  }
}

export default RequireAuth
