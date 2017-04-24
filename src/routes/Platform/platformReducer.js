import { types } from './platformActions'

const initialState = {
  ajaxPending: false,
  apiError: '',
  items: []
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {

    case types.PLATFORMS_AJAX_BEGIN:
      return Object.assign({}, state, {
        ajaxPending: true
      })

    case types.PLATFORMS_AJAX_END:
      return Object.assign({}, state, {
        ajaxPending: false,
        apiError: ''
      })

    case types.PLATFORMS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      })

    default:
      return state
  }
}
