import { actions, types } from './counterActions'
import counterReducer from './counterReducer'

describe('(Redux Module) Counter', () => {
  it('Should export a constant COUNTER_INCREMENT.', () => {
    expect(types.COUNTER_INCREMENT).toEqual('COUNTER_INCREMENT')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(counterReducer).toBeInstanceOf(Function)
    })

    it('Should initialize with a state of 0 (Number).', () => {
      expect(counterReducer(undefined, {}).count).toEqual(0)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = counterReducer(undefined, {})
      expect(state.count).toEqual(0)
      state = counterReducer(state, { type: '@@@@@@@' })
      expect(state.count).toEqual(0)
      state = counterReducer(state, actions.increment(5))
      expect(state.count).toEqual(5)
      state = counterReducer(state, { type: '@@@@@@@' })
      expect(state.count).toEqual(5)
    })
  })

  describe('(Action Creator) increment', () => {
    it('Should be exported as a function.', () => {
      expect(actions.increment).toBeInstanceOf(Function)
    })

    it('Should return an action with type "COUNTER_INCREMENT".', () => {
      expect(actions.increment()).toHaveProperty('type', types.COUNTER_INCREMENT)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(actions.increment(5)).toHaveProperty('payload', 5)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(actions.increment()).toHaveProperty('payload', 1)
    })
  })

  describe('(Action Creator) doubleAsync', () => {
    let stateMock
    let dispatchMock
    let getStateMock

    beforeEach(() => {
      stateMock = {
        counter: counterReducer(undefined, {})
      }
      dispatchMock = jest.fn((action) => {
        stateMock = {
          ...stateMock,
          counter: counterReducer(stateMock.counter, action)
        }
      })
      getStateMock = jest.fn(() => {
        return stateMock
      })
    })

    it('Should be exported as a function.', () => {
      expect(actions.doubleAsync).toBeInstanceOf(Function)
    })

    it('Should return a function (is a thunk).', () => {
      expect(actions.doubleAsync()).toBeInstanceOf(Function)
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return actions.doubleAsync()(dispatchMock, getStateMock).resolves
    })

    it('Should call dispatch and getState exactly once.', () => {
      return actions.doubleAsync()(dispatchMock, getStateMock)
        .then(() => {
          expect(dispatchMock.mock.calls.length).toEqual(1)
          expect(getStateMock.mock.calls.length).toEqual(1)
        })
    })

    it('Should produce a state that is double the previous state.', () => {
      stateMock.counter = { count: 2 }

      return actions.doubleAsync()(dispatchMock, getStateMock)
        .then(() => {
          expect(dispatchMock.mock.calls.length).toEqual(1)
          expect(getStateMock.mock.calls.length).toEqual(1)
          expect(stateMock.counter.count).toEqual(4)
          return actions.doubleAsync()(dispatchMock, getStateMock)
        })
        .then(() => {
          expect(dispatchMock.mock.calls.length).toEqual(2)
          expect(getStateMock.mock.calls.length).toEqual(2)
          expect(stateMock.counter.count).toEqual(8)
        })
    })
  })

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).
  describe('(Action Handler) COUNTER_INCREMENT', () => {
    it('Should increment the state by the action payload\'s "value" property.', () => {
      let state = counterReducer(undefined, {})
      expect(state.count).toEqual(0)
      state = counterReducer(state, actions.increment(1))
      expect(state.count).toEqual(1)
      state = counterReducer(state, actions.increment(2))
      expect(state.count).toEqual(3)
      state = counterReducer(state, actions.increment(-3))
      expect(state.count).toEqual(0)
    })
  })
})
