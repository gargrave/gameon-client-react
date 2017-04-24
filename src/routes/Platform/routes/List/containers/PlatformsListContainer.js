import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../platformActions'

import PlatformsListPage from '../components/PlatformsListPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  loggedIn: !!state.account.token && !!state.account.user.email,
  ajaxPending: state.account.ajaxPending,
  platforms: state.platforms.items
})

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsListPage)
