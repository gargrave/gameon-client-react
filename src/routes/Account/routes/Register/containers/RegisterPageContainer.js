import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../accountActions'

import RegisterPage from '../components/RegisterPage'

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  apiError: state.account.errors.register
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
