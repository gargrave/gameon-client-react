import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../gameActions'

import GameCreatePage from '../components/GameCreatePage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => {
  let initializing = state.app.initializing
  let loggedIn = !!state.account.token && !!state.account.user.email
  let ajaxPending = state.games.ajaxPending
  let readyToLoad = loggedIn && !initializing && !ajaxPending

  return {
    initializing,
    loggedIn,
    apiError: state.games.errors.create,
    ajaxPending,
    readyToLoad,
    platforms: state.platforms.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCreatePage)
