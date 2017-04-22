import { types } from './counterActions'

const initialState = {
  ajaxPending: false,
  usernameTaken: false,
  usernameAvailable: false,
  count: 0
}

export default function counterReducer (state = initialState, action) {
  // const handler = ACTION_HANDLERS[action.type]
  // return handler ? handler(state, action) : state
  switch (action.type) {
    case types.COUNTER_AJAX_BEGIN:
      return Object.assign({}, state, {
        ajaxPending: true
      })

    case types.COUNTER_AJAX_END:
      return Object.assign({}, state, {
        ajaxPending: false
      })

    case types.COUNTER_INCREMENT:
      return Object.assign({}, state, {
        count: state.count + action.payload
      })

    case types.COUNTER_DOUBLE_ASYNC:
      return Object.assign({}, state, {
        count: state.count * 2
      })

    case types.USERNAME_TAKEN:
      return Object.assign({}, state, {
        usernameTaken: true,
        usernameAvailable: false
      })

    case types.USERNAME_AVAILABLE:
      return Object.assign({}, state, {
        usernameAvailable: true,
        usernameTaken: false
      })

    default:
      return state
  }
}
