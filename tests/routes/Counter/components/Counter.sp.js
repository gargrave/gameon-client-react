import React from 'react'
import { bindActionCreators } from 'redux'
import { mount } from 'enzyme'

import { Counter } from './Counter'

describe('(Component) Counter', () => {
  let props, _spies, wrapper

  beforeEach(() => {
    // _spies = {}
    // props = {
    //   counter : 5,
    //   ...bindActionCreators({
    //     doubleAsync : (_spies.doubleAsync = sinon.spy()),
    //     increment   : (_spies.increment = sinon.spy())
    //   }, _spies.dispatch = sinon.spy())
    // }
    props = {
      ajaxPending: false,
      usernameTaken: false,
      usernameAvailable: false,
      counter: 5,
      increment: () => 0,
      doubleAsync: () => 0,
      checkUser: () => 0
    }
    wrapper = mount(<Counter {...props} />)
  })

  // it('Should render as a <div>.', () => {
  //   expect(wrapper.is('div')).to.equal(true)
  // })

  // it('Should render with an <h2> that includes Sample Counter text.', () => {
  //   expect(wrapper.find('h2').text()).to.match(/Counter:/)
  // })

  // it('Should render props.counter at the end of the sample counter <h2>.', () => {
  //   expect(wrapper.find('h2').text()).to.match(/5$/)
  //   wrapper.setProps({ counter: 8 })
  //   expect(wrapper.find('h2').text()).to.match(/8$/)
  // })

  // it('Should render exactly two buttons.', () => {
  //   expect(wrapper.find('button')).to.have.length(2)
  // })

  describe('An increment button...', () => {
    let _button

    beforeEach(() => {
      _button = wrapper.find('button').filterWhere(a => a.text() === 'Increment')
    })

    it('has semantic-ui classes', () => {
      expect(_button.hasClass('ui primary')).toBeTruthy()
    })

    // it('Should dispatch a `increment` action when clicked', () => {
    //   _spies.dispatch.should.have.not.been.called

    //   _button.simulate('click')

    //   _spies.dispatch.should.have.been.called
    //   _spies.increment.should.have.been.called
    // })
  })

  describe('A Double (Async) button...', () => {
    let _button

    beforeEach(() => {
      _button = wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    // it('has bootstrap classes', () => {
    //   expect(_button.hasClass('btn btn-default')).to.be.true
    // })

    // it('Should dispatch a `doubleAsync` action when clicked', () => {
    //   _spies.dispatch.should.have.not.been.called

    //   _button.simulate('click')

    //   _spies.dispatch.should.have.been.called
    //   _spies.doubleAsync.should.have.been.called
    // })
  })
})
