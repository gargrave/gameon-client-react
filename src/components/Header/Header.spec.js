import React from 'react'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

import { Header } from './Header'

describe('(Component) Header', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Header />)
  })

  it('Renders a welcome message', () => {
    const welcome = wrapper.find('h1')
    expect(welcome).toBeDefined()
    expect(welcome.text()).toMatch(/GameOn/)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Home route', () => {
      expect(wrapper.contains(
        <IndexLink activeClassName='route--active' to='/'>
          Home
        </IndexLink>
      )).toBeTruthy()
    })

    it('Should render a Link to Counter route', () => {
      expect(wrapper.contains(
        <Link activeClassName='route--active' to='/counter'>
          Counter
        </Link>
      )).toBeTruthy()
    })

    it('Should render a Link to Login route', () => {
      expect(wrapper.contains(
        <Link activeClassName='route--active' to='/account/login'>
          Login
        </Link>
      )).toBeTruthy()
    })

    it('Should render a Link to Register route', () => {
      expect(wrapper.contains(
        <Link activeClassName='route--active' to='/account/register'>
          Register
        </Link>
      )).toBeTruthy()
    })

    it('Should render a Link to Profile route', () => {
      expect(wrapper.contains(
        <Link activeClassName='route--active' to='/account/profile'>
          Profile
        </Link>
      )).toBeTruthy()
    })
  })
})
