import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../gameActions'

import GamesListPage from '../components/GamesListPage'

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
    ajaxPending: state.games.ajaxPending,
    readyToLoad,
    games: state.games.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesListPage)
