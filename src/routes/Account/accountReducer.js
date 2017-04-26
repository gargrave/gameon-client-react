import { types } from './accountActions'

const initialState = {
  ajaxPending: false,
  apiError: '',
  errors: {
    login: ''
  },
  token: '',
  user: {},
  profile: {}
}

// helper methods for building data from API responses
const parseUserData = (user) => ({
  id: user.pk,
  username: user.username,
  email: user.email,
  dateJoined: user.date_joined,
  lastLogin: user.last_login
})

const parseProfileData = (profile) => ({
  id: profile.pk,
  firstName: profile.first_name,
  lastName: profile.last_name
})

// pre-built messages for responding to various error states
const err = {
  login: 'Could not log in with the provided credentials. Please try again.'
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
        ajaxPending: false,
        apiError: 'whatever'
      })

    // handle successful login attempt; add the provided token to the store
    case types.ACCOUNT_LOGIN:
      return Object.assign({}, state, {
        token: action.token
      })

    // handle error responses from failed login attempts
    case types.ACCOUNT_LOGIN_ERROR:
      return Object.assign({}, state, {
        errors: { login: err.login }
      })

    case types.ACCOUNT_LOGOUT:
      return Object.assign({}, state, {
        token: '',
        user: {},
        profile: {}
      })

    case types.ACCOUNT_FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: parseUserData(action.user),
        profile: parseProfileData(action.profile)
      })

    default:
      return state
  }
}
