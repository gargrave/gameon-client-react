import React from 'react'
import { IndexLink, Link } from 'react-router'
import { mount } from 'enzyme'

import LoginForm from './LoginForm'

describe('(Component) LoginForm', () => {
  let wrapper
  let props
  let userInput
  let passwordInput
  let submitBtn

  beforeEach(() => {
    props = {
      working: false,
      loginData: {
        username: '',
        password: ''
      },
      errors: {
        username: '',
        password: ''
      },
      changed: jest.fn(),
      submitted: jest.fn()
    }
    wrapper = mount(<LoginForm {...props} />)

    userInput = wrapper.find('#login-username')
    passwordInput = wrapper.find('#login-password')
    submitBtn = wrapper.find('#login-submit')
  })

  describe('props bindings...', () => {
    test('both input fields should be blank by default', () => {
      expect(userInput.get(0).value).toEqual('')
      expect(passwordInput.get(0).value).toEqual('')
    })

    test('input fields should be populated if props are provided', () => {
      let expectedUser = 'expectedUser'
      let expectedPass = 'expectedPass'

      // set new props and re-mount the component
      props = Object.assign({}, props, {
        loginData: {
          username: expectedUser,
          password: expectedPass
        }
      })
      wrapper = mount(<LoginForm {...props} />)
      userInput = wrapper.find('#login-username')
      passwordInput = wrapper.find('#login-password')

      expect(userInput.get(0).value).toEqual(expectedUser)
      expect(passwordInput.get(0).value).toEqual(expectedPass)
    })
  })

  describe('events...', () => {
    test('should fire the "onChange" handler when an input field changes.', () => {
      expect(props.changed).toHaveBeenCalledTimes(0)
      userInput.simulate('change')
      expect(props.changed).toHaveBeenCalledTimes(1)
      userInput.simulate('change')
      expect(props.changed).toHaveBeenCalledTimes(2)
    })

    test('should fire the "submit" handler when submit button is clicked.', () => {
      expect(props.submitted).toHaveBeenCalledTimes(0)
      submitBtn.simulate('click')
      expect(props.submitted).toHaveBeenCalledTimes(1)
    })
  })

  describe('errors...', () => {
    test('should not have any error messages by default.', () => {
      let userErr = wrapper.find('#login-username-error')
      let passwordErr = wrapper.find('#login-password-error')
      expect(userErr).toHaveLength(0)
      expect(passwordErr).toHaveLength(0)
    })

    test('should show error messages if it receives them in props.', () => {
      // set new props and re-mount the component
      props = Object.assign({}, props, {
        errors: {
          username: 'ONO USERNAME ERROR',
          password: 'ONO PASSWORD ERROR'
        }
      })
      wrapper = mount(<LoginForm {...props} />)

      let userErr = wrapper.find('#login-username-error')
      let passwordErr = wrapper.find('#login-password-error')
      expect(userErr).toHaveLength(1)
      expect(passwordErr).toHaveLength(1)
    })
  })
})
