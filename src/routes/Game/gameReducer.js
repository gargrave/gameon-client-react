import { types } from './gameActions'

// pre-built messages for responding to various error states
const err = {
  fetch: 'There was an error fetching your Games.',
  create: 'There was an error creating your Game.',
  update: 'There was an error updating your Game.'
}

const errorsInitialState = () => ({
  fetch: '',
  create: '',
  update: ''
})

const initialState = {
  ajaxPending: false,
  errors: errorsInitialState(),
  items: []
}

export default function counterReducer (state = initialState, action) {
  switch (action.type) {

    case types.GAMES_AJAX_BEGIN:
      return Object.assign({}, state, {
        ajaxPending: true
      })

    case types.GAMES_AJAX_END:
      return Object.assign({}, state, {
        ajaxPending: false,
        errors: errorsInitialState()
      })

    // 'fetch' operations
    case types.GAMES_FETCH_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      })

    case types.GAMES_FETCH_ERROR:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          fetch: err.fetch
        })
      })

    // create operations
    case types.GAMES_CREATE_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, action.game]
      })

    case types.GAMES_CREATE_ERROR:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          create: err.create
        })
      })

    // update operations
    case types.GAMES_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        items: [
          ...state.items.filter(i => Number(i.id) !== Number(action.game.id)),
          action.game
        ]
      })

    case types.GAMES_UPDATE_ERROR:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          update: err.update
        })
      })

    default:
      return state
  }
}
