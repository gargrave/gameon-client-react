import { injectReducer } from '../store/reducers'

import Home from './Home'
import CounterRoute from './Counter'
import AccountRoute from './Account'

export const createRoutes = (store) => ({
  path: '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CoreLayout = require('../layouts/CoreLayout').default
      const reducer = require('./Account/accountReducer').default

      /* we know we will always need this reducer (for auth),
       * so we are injecting it here instead of in the Account route */
      injectReducer(store, { key: 'account', reducer })

      cb(null, CoreLayout)
    }, 'account')
  },
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    AccountRoute(store)
  ]
})

export default createRoutes
