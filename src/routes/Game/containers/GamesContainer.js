import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../gameActions'

import GamesHome from '../components/GamesHome'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => {
  let initializing = state.app.initializing
  let loggedIn = !!state.account.token && !!state.account.user.email
  let readyToLoad = loggedIn && !initializing

  return {
    initializing,
    loggedIn,
    readyToLoad,
    ajaxPending: state.games.ajaxPending
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesHome)
