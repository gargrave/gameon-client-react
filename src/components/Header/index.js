import { connect } from 'react-redux'

import Header from './Header'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.account.token && !!state.account.user.email
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
