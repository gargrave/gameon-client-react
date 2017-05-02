import { types } from './platformActions'

// pre-built messages for responding to various error states
const err = {
  fetch: 'There was an error fetching your Platforms.',
  create: 'There was an error creating your Platform.'
}

const errorsInitialState = () => ({
  fetch: '',
  create: ''
})

const initialState = {
  ajaxPending: false,
  errors: errorsInitialState(),
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
        errors: errorsInitialState()
      })

    // 'fetch' operations
    case types.PLATFORMS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      })

    case types.PLATFORMS_FETCH_ERROR:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          login: err.fetch
        })
      })

    // create operations
    case types.PLATFORMS_CREATE_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, action.platform]
      })

    case types.PLATFORMS_CREATE_ERROR:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          login: err.create
        })
      })

    default:
      return state
  }
}
