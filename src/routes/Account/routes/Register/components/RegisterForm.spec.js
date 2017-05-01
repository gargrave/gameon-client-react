import React from 'react'
import { IndexLink, Link } from 'react-router'
import { mount } from 'enzyme'

import RegisterForm from './RegisterForm'

describe('(Component) RegisterForm', () => {
  let wrapper
  let props
  let userInput
  let emailInput
  let password1Input
  let password2Input
  let submitBtn

  beforeEach(() => {
    props = {
      working: false,
      registerData: {
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
    wrapper = mount(<RegisterForm {...props} />)

    userInput = wrapper.find('#register-username')
    emailInput = wrapper.find('#register-email')
    password1Input = wrapper.find('#register-password1')
    password2Input = wrapper.find('#register-password2')
    submitBtn = wrapper.find('#register-submit')
  })

  describe('props bindings...', () => {
    test('both input fields should be blank by default', () => {
      expect(userInput.get(0).value).toEqual('')
      expect(emailInput.get(0).value).toEqual('')
      expect(password1Input.get(0).value).toEqual('')
      expect(password2Input.get(0).value).toEqual('')
    })

    test('input fields should be populated if props are provided', () => {
      let expectedUser = 'expectedUser'
      let expectedEmail = 'user@email.com'
      let expectedPass = 'expectedPass'

      // set new props and re-mount the component
      props = Object.assign({}, props, {
        registerData: {
          username: expectedUser,
          email: expectedEmail,
          password1: expectedPass,
          password2: expectedPass,
        }
      })
      wrapper = mount(<RegisterForm {...props} />)
      userInput = wrapper.find('#register-username')
      emailInput = wrapper.find('#register-email')
      password1Input = wrapper.find('#register-password1')
      password2Input = wrapper.find('#register-password2')

      expect(userInput.get(0).value).toEqual(expectedUser)
      expect(emailInput.get(0).value).toEqual(expectedEmail)
      expect(password1Input.get(0).value).toEqual(expectedPass)
      expect(password2Input.get(0).value).toEqual(expectedPass)
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
})
