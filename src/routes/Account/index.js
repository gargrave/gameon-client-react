import LoginRoute from './routes/Login'
import ProfileRoute from './routes/Profile'
import RegisterRoute from './routes/Register'

export default (store) => ({
  path: 'account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/AccountParentContainer').default
      cb(null, Account)
    }, 'account')
  },
  indexRoute: ProfileRoute(store),
  childRoutes: [
    LoginRoute(store),
    ProfileRoute(store),
    RegisterRoute(store)
  ]
})
