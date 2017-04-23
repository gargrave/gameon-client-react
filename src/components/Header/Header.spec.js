import React from 'react'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

import { Header } from './Header'

describe('(Component) Header', () => {
  let wrapper

  /*=============================================
   = Basic view (no auth checks)
   =============================================*/

  describe('Navigation links...', () => {

    describe('Regardless of auth state...', () => {
      beforeEach(() => {
        wrapper = shallow(<Header loggedIn={false} />)
      })

      it('Renders a welcome message', () => {
        const welcome = wrapper.find('h1')
        expect(welcome).toBeDefined()
        expect(welcome.text()).toMatch(/GameOn/)
      })

      it('Renders a Link to Home route', () => {
        expect(wrapper.contains(
          <IndexLink activeClassName='route--active' to='/'>
            Home
          </IndexLink>
        )).toBeTruthy()
      })

      it('Renders a Link to Counter route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/counter'>
            Counter
          </Link>
        )).toBeTruthy()
      })
    })

    /*=============================================
     = Non-authenticated view
     =============================================*/

    describe('When not logged in...', () => {
      beforeEach(() => {
        wrapper = shallow(<Header loggedIn={false} />)
      })

      it('Renders a Link to Login route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/login'>
            Login
          </Link>
        )).toBeTruthy()
      })

      it('Renders a Link to Register route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/register'>
            Register
          </Link>
        )).toBeTruthy()
      })

      it('Does not render a Link to Profile route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/profile'>
            Profile
          </Link>
        )).toBeFalsy()
      })
    })

    /*=============================================
     = Authenticated view
     =============================================*/

    describe('When logged in...', () => {
      beforeEach(() => {
        wrapper = shallow(<Header loggedIn={true} />)
      })

      it('Does not render a Link to Login route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/login'>
            Login
          </Link>
        )).toBeFalsy()
      })

      it('Does not render a Link to Register route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/register'>
            Register
          </Link>
        )).toBeFalsy()
      })

      it('Renders a Link to Profile route', () => {
        expect(wrapper.contains(
          <Link activeClassName='route--active' to='/account/profile'>
            Profile
          </Link>
        )).toBeTruthy()
      })
    })
  })
})
