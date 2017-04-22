import React from 'react'
import { render } from 'enzyme'

import { HomeView } from './HomeView'

describe('(View) Home', () => {
  let component

  beforeEach(() => {
    component = render(<HomeView />)
  })

  it('Renders a welcome message', () => {
    const welcome = component.find('h4')
    expect(welcome).toBeDefined()
    expect(welcome.text()).toMatch(/GameOn HomeView/)
  })
})
