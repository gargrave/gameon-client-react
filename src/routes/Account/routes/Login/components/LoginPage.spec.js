import React from 'react'
import { IndexLink, Link } from 'react-router'
import { mount } from 'enzyme'

import LoginPage from './LoginPage'

const login = jest.fn().mockImplementation(credentials => {
  return new Promise((resolve, reject) => {
    if (credentials.username === 'testuser' && credentials.password === 'password') {
      resolve()
    }
    reject('invalid logins')
  })
})

const fetchUser = jest.fn().mockImplementation(() => Promise.resolve())

describe('(Component) LoginPage', () => {
  let wrapper
  let props
  let form
  let userInput
  let passwordInput
  let submitBtn

  beforeEach(() => {
    props = {
      actions: {
        login,
        fetchUser
      },
      apiError: '',
      ajaxPending: false
    }
    wrapper = mount(<LoginPage {...props} />)

    form = wrapper.find('.login-form')
    userInput = wrapper.find('#login-username')
    passwordInput = wrapper.find('#login-password')
    submitBtn = wrapper.find('#login-submit')
  })

  describe('Layout...', () => {
    test('should have a LoginForm.', () => {
      expect(form).toHaveLength(1)
    })

    test('should not have an error message by default.', () => {
      let error = wrapper.find('#login-api-error')
      expect(error).toHaveLength(0)
    })

    test('should show an error message when it has an "apiError" in props.', () => {
      props = Object.assign({}, props, { apiError: 'error' })
      wrapper = mount(<LoginPage {...props} />)
      let error = wrapper.find('#login-api-error')
      expect(error).toHaveLength(1)
    })
  })


  describe('State handling...', () => {
    test('should have all necessary input fields.', () => {
      expect(userInput).toBeDefined()
      expect(passwordInput).toBeDefined()
    })

    test('should update state.username with input events.', () => {
      const name = 'username'
      const value = 'harry'

      userInput.simulate('change', { target: { name, value } })
      let result = wrapper.state('loginData')[name]
      expect(result).toEqual(value)

      userInput.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('loginData')[name]
      expect(result).toHaveLength(0)
    })

    test('should update state.password with input events.', () => {
      const name = 'password'
      const value = 'supersecret'

      passwordInput.simulate('change', { target: { name, value } })
      let result = wrapper.state('loginData')[name]
      expect(result).toEqual(value)

      passwordInput.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('loginData')[name]
      expect(result).toHaveLength(0)
    })
  })

  describe('Events...', () => {
    test('should have a submit button.', () => {
      expect(submitBtn).toHaveLength(1)
    })

    test('should not call login() if either value is empty.', () => {
      userInput.simulate('change', { target: { name: 'username', value: 'user' } })

      submitBtn.simulate('click')
      expect(props.actions.login).toHaveBeenCalledTimes(0)

      userInput.simulate('change', { target: { name: 'username', value: '' } })
      passwordInput.simulate('change', { target: { name: 'password', value: 'pass' } })

      submitBtn.simulate('click')
      expect(props.actions.login).toHaveBeenCalledTimes(0)
    })

    test('should not call login() if password is too short.', () => {
      passwordInput.simulate('change', { target: { name: 'password', value: '1234567' } })

      submitBtn.simulate('click')
      expect(props.actions.login).toHaveBeenCalledTimes(0)
    })

    test('should call login() if all values are valid.', () => {
      userInput.simulate('change', { target: { name: 'username', value: 'user' } })
      passwordInput.simulate('change', { target: { name: 'password', value: 'password' } })

      submitBtn.simulate('click')
      expect(props.actions.login).toHaveBeenCalledTimes(1)
    })
  })
})
