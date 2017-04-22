import {
  LOCATION_CHANGE,
  locationChange,
  updateLocation,
  default as locationReducer
} from './location'

describe('(Internal Module) Location', () => {
  it('Should export a constant LOCATION_CHANGE.', () => {
    expect(LOCATION_CHANGE).toEqual('LOCATION_CHANGE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(locationReducer).toBeInstanceOf(Function)
    })

    it('Should initialize with a location object.', () => {
      expect(locationReducer(undefined, {})).toBeInstanceOf(Object)
      expect(locationReducer(undefined, {})).toHaveProperty('pathname')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = locationReducer(undefined, {})
      const locationState = { pathname: '/yup' }

      expect(state).toBeInstanceOf(Object)
      state = locationReducer(state, locationChange(locationState))
      expect(state).toEqual(locationState)
      expect(state).toHaveProperty('pathname', '/yup')
      state = locationReducer(state, { type: '@@@@@@@' })
      expect(state).toEqual(locationState)
      expect(state).toHaveProperty('pathname', '/yup')
    })
  })

  describe('(Action Creator) locationChange', () => {
    it('Should be exported as a function.', () => {
      expect(locationChange).toBeInstanceOf(Function)
    })

    it('Should return an action with type "LOCATION_CHANGE".', () => {
      expect(locationChange()).toHaveProperty('type', LOCATION_CHANGE)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      const locationState = { pathname: '/yup' }
      expect(locationChange(locationState)).toHaveProperty('payload', locationState)
    })

    it('Should default the "payload" property to "/" if not provided.', () => {
      expect(locationChange()).toHaveProperty('payload', '/')
    })
  })

  describe('(Specialized Action Creator) updateLocation', () => {
    let stateMock
    let dispatchMock

    beforeEach(() => {
      stateMock = {
        location: locationReducer(undefined, {})
      }
      dispatchMock = jest.fn(action => {
        stateMock = {
          ...stateMock,
          location: locationReducer(stateMock.location, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(updateLocation).toBeInstanceOf(Function)
    })

    it('Should return a function (is a thunk).', () => {
      expect(updateLocation({ dispatch: dispatchMock })).toBeInstanceOf(Function)
    })

    it('Should call dispatch exactly once.', () => {
      updateLocation({ dispatch: dispatchMock })('/')
      expect(dispatchMock).toBeCalled()
    })
  })
})
