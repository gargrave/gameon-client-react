import { types } from './accountActions'

const initialState = {
  ajaxPending: false
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {

    case types.ACCOUNT_AJAX_BEGIN:
      return Object.assign({}, state, {
        ajaxPending: true
      })

    case types.ACCOUNT_AJAX_END:
      return Object.assign({}, state, {
        ajaxPending: false
      })

    default:
      return state
  }
}
