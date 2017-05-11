import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'

export class Header extends React.Component {
  renderNotLoggedInContent () {
    return (
      <span>
        <Link to='/account/login' activeClassName='route--active'>
          Login
        </Link>
        {' | '}
        <Link to='/account/register' activeClassName='route--active'>
          Register
        </Link>
      </span>
    )
  }

  renderLoggedInContent () {
    return (
      <span>
        <Link to='/games' activeClassName='route--active'>
          Games
        </Link>
        {' | '}
        <Link to='/platforms' activeClassName='route--active'>
          Platforms
        </Link>
        {' | '}
        <Link to='/account/profile' activeClassName='route--active'>
          Profile
        </Link>
      </span>
    )
  }

  render () {
    const { loggedIn } = this.props
    return (
      <div>
        <h1>GameOn</h1>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
        {' | '}
        <Link to='/counter' activeClassName='route--active'>
          Counter
        </Link>
        {' | '}

        {!loggedIn && this.renderNotLoggedInContent()}
        {loggedIn && this.renderLoggedInContent()}
      </div>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

export default Header
