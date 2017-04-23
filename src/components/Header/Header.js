import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Header = () => (
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
    <Link to='/account/login' activeClassName='route--active'>
      Login
    </Link>
    {' | '}
    <Link to='/account/register' activeClassName='route--active'>
      Register
    </Link>
    {' | '}
    <Link to='/account/profile' activeClassName='route--active'>
      Profile
    </Link>
  </div>
)

export default Header
