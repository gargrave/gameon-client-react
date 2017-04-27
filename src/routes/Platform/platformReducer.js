import { types } from './platformActions'

const initialState = {
  ajaxPending: false,
  errors: {
    fetch: ''
  },
  items: []
}

// pre-built messages for responding to various error states
const err = {
  fetch: 'There was an error fetching your Platforms.'
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

    case types.PLATFORMS_FETCH_ERROR:
      return Object.assign({}, state, {
        errors: { fetch: err.fetch }
      })

    default:
      return state
  }
}
