import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../accountActions'

import LoginPage from '../components/LoginPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  apiError: state.account.apiError
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
