import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../platformActions'

import PlatformsListPage from '../components/PlatformsListPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => {
  let initializing = state.app.initializing
  let loggedIn = !!state.account.token && !!state.account.user.email
  let ajaxPending = state.platforms.ajaxPending
  let readyToLoad = loggedIn && !initializing && !ajaxPending

  return {
    initializing,
    loggedIn,
    ajaxPending: state.platforms.ajaxPending,
    readyToLoad,
    platforms: state.platforms.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsListPage)
