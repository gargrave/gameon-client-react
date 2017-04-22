import CounterRoute from './'

describe('(Route) Counter', () => {
  let route

  beforeEach(() => {
    route = CounterRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof route).toEqual('object')
  })

  it('Configuration should contain path `counter`', () => {
    expect(route.path).toEqual('counter')
  })
})
