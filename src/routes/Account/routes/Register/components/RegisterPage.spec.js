import React from 'react'
import { IndexLink, Link } from 'react-router'
import { mount } from 'enzyme'

import RegisterPage from './RegisterPage'

const register = jest.fn().mockImplementation(credentials => {
  return new Promise((resolve, reject) => {
    resolve()
  })
})

const fetchUser = jest.fn().mockImplementation(() => Promise.resolve())

describe('(Component) RegisterPage', () => {
  let wrapper
  let props
  let form
  let userInput
  let emailInput
  let password1Input
  let password2Input
  let submitBtn

  beforeEach(() => {
    props = {
      actions: {
        register,
        fetchUser
      },
      apiError: '',
      ajaxPending: false
    }
    wrapper = mount(<RegisterPage {...props} />)

    form = wrapper.find('#register-form')
    userInput = wrapper.find('#register-username')
    emailInput = wrapper.find('#register-username')
    password1Input = wrapper.find('#register-password1')
    password2Input = wrapper.find('#register-password2')
    submitBtn = wrapper.find('#register-submit')
  })

  describe('Layout...', () => {
    test('should have a RegisterForm.', () => {
      expect(form).toHaveLength(1)
    })

    test('should not have an error message by default.', () => {
      let error = wrapper.find('#register-api-error')
      expect(error).toHaveLength(0)
    })

    test('should show an error message when it has an "apiError" in props.', () => {
      props = Object.assign({}, props, { apiError: 'error' })
      wrapper = mount(<RegisterPage {...props} />)
      let error = wrapper.find('#register-api-error')
      expect(error).toHaveLength(1)
    })
  })


  describe('State handling...', () => {
    test('should have all necessary input fields.', () => {
      expect(userInput).toHaveLength(1)
      expect(emailInput).toHaveLength(1)
      expect(password1Input).toHaveLength(1)
      expect(password2Input).toHaveLength(1)
    })

    test('should update state.username with input events.', () => {
      const name = 'username'
      const value = 'harry'

      userInput.simulate('change', { target: { name, value } })
      let result = wrapper.state('registerData')[name]
      expect(result).toEqual(value)

      userInput.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('registerData')[name]
      expect(result).toHaveLength(0)
    })

    test('should update state.email with input events.', () => {
      const name = 'email'
      const value = 'harry@harry.com'

      emailInput.simulate('change', { target: { name, value } })
      let result = wrapper.state('registerData')[name]
      expect(result).toEqual(value)

      emailInput.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('registerData')[name]
      expect(result).toHaveLength(0)
    })

    test('should update state.password1 with input events.', () => {
      const name = 'password1'
      const value = 'supersecret1'

      password1Input.simulate('change', { target: { name, value } })
      let result = wrapper.state('registerData')[name]
      expect(result).toEqual(value)

      password1Input.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('registerData')[name]
      expect(result).toHaveLength(0)
    })

    test('should update state.password2 with input events.', () => {
      const name = 'password2'
      const value = 'supersecret2'

      password2Input.simulate('change', { target: { name, value } })
      let result = wrapper.state('registerData')[name]
      expect(result).toEqual(value)

      password2Input.simulate('change', { target: { name, value: '' } })
      result = wrapper.state('registerData')[name]
      expect(result).toHaveLength(0)
    })
  })

  describe('Events...', () => {
    beforeEach(() => {
      userInput.simulate('change', { target: { name: 'username', value: 'user' } })
      emailInput.simulate('change', { target: { name: 'email', value: 'email@email.com' } })
      password1Input.simulate('change', { target: { name: 'password1', value: 'password' } })
      password2Input.simulate('change', { target: { name: 'password2', value: 'password' } })
    })

    test('should have a submit button.', () => {
      expect(submitBtn).toHaveLength(1)
    })

    test('should not call register() if any required value is empty.', () => {
      userInput.simulate('change', { target: { name: 'username', value: '' } })
      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)

      userInput.simulate('change', { target: { name: 'username', value: 'user' } })
      emailInput.simulate('change', { target: { name: 'email', value: '' } })
      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)

      emailInput.simulate('change', { target: { name: 'email', value: 'email@email.com' } })
      password1Input.simulate('change', { target: { name: 'password1', value: '' } })
      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)

      password1Input.simulate('change', { target: { name: 'password1', value: 'pass1' } })
      password1Input.simulate('change', { target: { name: 'password1', value: '' } })
      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)
    })

    test('should not call register() if email is invalid.', () => {
      emailInput.simulate('change', { target: { name: 'email', value: 'notanemail' } })

      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)
    })

    test('should not call register() if password is too short.', () => {
      password1Input.simulate('change', { target: { name: 'password1', value: '1234567' } })

      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)
    })

    test('should not call register() if passwords do not match.', () => {
      password1Input.simulate('change', { target: { name: 'password1', value: '12345678' } })
      password2Input.simulate('change', { target: { name: 'password2', value: '87654321' } })

      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(0)
    })

    test('should call register() if all values are valid.', () => {
      submitBtn.simulate('click')
      expect(props.actions.register).toHaveBeenCalledTimes(1)
    })
  })
})
