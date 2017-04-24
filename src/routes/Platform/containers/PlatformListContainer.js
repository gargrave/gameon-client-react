import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../platformActions'

import PlatformListPage from '../components/PlatformListPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  loggedIn: !!state.account.token && !!state.account.user.email,
  ajaxPending: state.platforms.ajaxPending
})

export default connect(mapStateToProps, mapDispatchToProps)(PlatformListPage)
