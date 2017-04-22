import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

import Counter from './Counter'

describe('(Component) Counter', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      ajaxPending: false,
      usernameTaken: false,
      usernameAvailable: false,
      counter: 5,
      increment: jest.fn(),
      doubleAsync: jest.fn(),
      checkUser: jest.fn()
    }
    wrapper = shallow(<Counter {...props} />)
  })

  it('Should render as a <div>.', () => {
    expect(wrapper.is('div')).toBeTruthy()
  })

  it('Should render with an <h2> that includes Sample Counter text.', () => {
    expect(wrapper.find('h2.counter-display').text()).toMatch(/Counter:/)
  })

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    expect(wrapper.find('h2.counter-display').text()).toMatch(/5$/)
    wrapper.setProps({ counter: 8 })
    expect(wrapper.find('h2.counter-display').text()).toMatch(/8$/)
  })

  it('Should render exactly three buttons.', () => {
    expect(wrapper.find('Button')).toHaveLength(3)
  })

  describe('An increment button...', () => {
    let btn

    beforeEach(() => {
      btn = wrapper.find('.increment-button')
    })

    it('Should dispatch a `increment` action when clicked', () => {
      expect(props.increment).toHaveBeenCalledTimes(0)
      btn.simulate('click')
      expect(props.increment).toHaveBeenCalledTimes(1)
    })
  })

  describe('A Double (Async) button...', () => {
    let btn

    beforeEach(() => {
      btn = wrapper.find('.double-button')
    })

    it('Should dispatch a `doubleAsync` action when clicked', () => {
      expect(props.doubleAsync).toHaveBeenCalledTimes(0)
      btn.simulate('click')
      expect(props.doubleAsync).toHaveBeenCalledTimes(1)
    })
  })
})
