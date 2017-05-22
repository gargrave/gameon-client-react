import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import apiHelper from '../../../../../utils/apiHelper'
import { actions } from '../../../gameActions'

import GameDetailPage from '../components/GameDetailPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => {
  let initializing = state.app.initializing
  let loggedIn = !!state.account.token && !!state.account.user.email
  let ajaxPending = state.games.ajaxPending
  let readyToLoad = loggedIn && !initializing && !ajaxPending

  let gameId = ownProps.params.id
  let game = apiHelper.findRecordById(state.games.items, gameId) || {}
  game.dates.sort().reverse()

  return {
    initializing,
    loggedIn,
    apiError: state.games.errors.update,
    ajaxPending: state.games.ajaxPending,
    readyToLoad,
    game,
    platforms: state.platforms.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetailPage)
