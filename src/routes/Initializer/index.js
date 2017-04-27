import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as initActions } from './initializerActions'
import { actions as accountActions } from '../../routes/Account/accountActions'

import Initializer from './Initializer'

const mapDispatchToProps = (dispatch) => ({
  initActions: bindActionCreators(initActions, dispatch),
  accountActions: bindActionCreators(accountActions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  apiError: state.account.apiError
})

export default connect(mapStateToProps, mapDispatchToProps)(Initializer)
