import { injectReducer } from '../store/reducers'

import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import Home from './Home'
import CounterRoute from './Counter'
import AccountRoute from './Account'
import PlatformRoute from './Platform'
import GameRoute from './Game'

export const createRoutes = (store) => ({
  path: '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const CoreLayout = require('../layouts/CoreLayout').default
      const initializerReducer = require('./Initializer/initializerReducer').default
      const accountReducer = require('./Account/accountReducer').default
      const platformReducer = require('./Platform/platformReducer').default
      const gameReducer = require('./Game/gameReducer').default

      /* go ahead and inject any reducers we know we will need */
      injectReducer(store, { key: 'app', reducer: initializerReducer })
      injectReducer(store, { key: 'account', reducer: accountReducer })
      injectReducer(store, { key: 'platforms', reducer: platformReducer })
      injectReducer(store, { key: 'games', reducer: gameReducer })

      cb(null, CoreLayout)
    }, 'account')
  },
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    AccountRoute(store),
    PlatformRoute(store),
    GameRoute(store)
  ]
})

export default createRoutes
