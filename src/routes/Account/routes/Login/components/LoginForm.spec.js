import React from 'react'
import { IndexLink, Link } from 'react-router'
import { mount } from 'enzyme'

import LoginForm from './LoginForm'

const handleChangeMock = jest.fn().mockImplementation((event) => {

})

const handleSubmitMock = jest.fn().mockImplementation((event) => {

})

describe('(Component) LoginForm', () => {
  let wrapper
  let props
  let userInput
  let passwordInput

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
      changed: handleChangeMock,
      submitted: handleSubmitMock
    }
    wrapper = mount(<LoginForm {...props} />)

    userInput = wrapper.find('#login-username')
    passwordInput = wrapper.find('#login-password')
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
})
