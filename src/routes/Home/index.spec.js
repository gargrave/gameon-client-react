import HomeRoute from './'

describe('(Route) Home', () => {
  let route

  beforeEach(() => {
    route = HomeRoute.component()
  })

  it('Should return a route configuration object', () => {
    expect(typeof route).toEqual('object')
  })

  it('Should define a route component', () => {
    expect(route.type).toEqual('div')
  })
})
