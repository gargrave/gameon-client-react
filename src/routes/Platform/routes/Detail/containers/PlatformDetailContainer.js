import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../platformActions'

import PlatformDetailPage from '../components/PlatformDetailPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  loggedIn: !!state.account.token && !!state.account.user.email
})

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage)
