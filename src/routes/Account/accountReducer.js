import { types } from './accountActions'

const initialState = {
  ajaxPending: false,
  apiError: '',
  token: ''
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {

    case types.ACCOUNT_AJAX_BEGIN:
      return Object.assign({}, state, {
        ajaxPending: true
      })

    case types.ACCOUNT_AJAX_END:
      return Object.assign({}, state, {
        ajaxPending: false,
        apiError: ''
      })

    case types.ACCOUNT_AJAX_ERROR:
      return Object.assign({}, state, {
        // apiError: action.err
        apiError: 'err'
      })

    case types.ACCOUNT_LOGIN:
      return Object.assign({}, state, {
        token: action.token
      })

    case types.ACCOUNT_LOGOUT:
      return Object.assign({}, state, {
        token: ''
      })

    default:
      return state
  }
}
