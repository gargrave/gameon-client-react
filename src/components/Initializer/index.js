import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../routes/Account/accountActions'

import Initializer from './Initializer'

const mapDispatchToProps = (dispatch) => ({
  accountActions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = (state) => ({
  ajaxPending: state.account.ajaxPending,
  apiError: state.account.apiError
})

export default connect(mapStateToProps, mapDispatchToProps)(Initializer)
