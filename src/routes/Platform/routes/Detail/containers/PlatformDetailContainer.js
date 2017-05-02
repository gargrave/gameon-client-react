import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import apiHelper from '../../../../../utils/apiHelper'
import { actions } from '../../../platformActions'

import PlatformDetailPage from '../components/PlatformDetailPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => {
  let initializing = state.app.initializing
  let loggedIn = !!state.account.token && !!state.account.user.email
  let ajaxPending = state.platforms.ajaxPending
  let readyToLoad = loggedIn && !initializing && !ajaxPending

  let platformId = ownProps.params.id
  let platform = apiHelper.findRecordById(state.platforms.items, platformId) || {}

  return {
    initializing,
    loggedIn,
    apiError: state.platforms.errors.update,
    ajaxPending: state.platforms.ajaxPending,
    readyToLoad,
    platform
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage)
