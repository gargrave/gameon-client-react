import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../accountActions'

import ProfilePage from '../components/ProfilePage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  loggedIn: !!state.account.token
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
