import { connect } from 'react-redux'
// import { actions } from '../accountActions'

import ProfilePage from '../components/ProfilePage'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.account.token
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
