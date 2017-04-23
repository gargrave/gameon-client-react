import { injectReducer } from '../../store/reducers'

import LoginRoute from './routes/Login'
import ProfileRoute from './routes/Profile'
import RegisterRoute from './routes/Register'

export default (store) => ({
  path: 'account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/AccountParentContainer').default
      const reducer = require('./accountReducer').default

      /*  Add the reducer to the store on key 'account'  */
      injectReducer(store, { key: 'account', reducer })

      cb(null, Account)
    }, 'account')
  },
  childRoutes: [
    LoginRoute(store),
    ProfileRoute(store),
    RegisterRoute(store)
  ]
})
