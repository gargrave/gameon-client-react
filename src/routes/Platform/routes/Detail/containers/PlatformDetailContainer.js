import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import apiHelper from '../../../../../utils/apiHelper'
import { actions } from '../../../platformActions'

import PlatformDetailPage from '../components/PlatformDetailPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => {
  let platformId = ownProps.params.id
  let platform = apiHelper.findRecordById(state.platforms.items, platformId)

  return {
    ajaxPending: state.account.ajaxPending,
    loggedIn: !!state.account.token && !!state.account.user.email,
    platform
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage)
