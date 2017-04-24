import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../platformActions'

import PlatformDetailPage from '../components/PlatformDetailPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state, ownProps) => {
  let platformId = ownProps.params.id
  console.log('TODO: need to parse platform info for platformId:')
  console.log(platformId)
  // let platform = apiHelper.findRecordById(state.platforms, platformId);
  // if (!platform) {
  //   platform = PLATFORM_API.getNewRecord();
  // }
  return {
    ajaxPending: state.account.ajaxPending,
    loggedIn: !!state.account.token && !!state.account.user.email
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage)
