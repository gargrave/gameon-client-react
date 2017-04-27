import { types } from './initializerActions'

const initialState = {
  initializing: true
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {

    case types.INITIALIZER_BEGIN:
      return Object.assign({}, state, {
        initializing: true
      })

    case types.INITIALIZER_END:
      return Object.assign({}, state, {
        initializing: false
      })

    default:
      return state
  }
}
