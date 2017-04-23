import { connect } from 'react-redux'

import Header from './Header'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.account.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
