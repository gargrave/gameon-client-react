import { types } from './accountActions'

const initialState = {
  ajaxPending: false,
  apiError: '',
  token: '',
  user: {},
  profile: {}
}

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

    case types.ACCOUNT_LOGIN:
      return Object.assign({}, state, {
        token: action.token
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
