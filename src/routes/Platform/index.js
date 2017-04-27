import PlatformCreateRoute from './routes/Create'
import PlatformDetailRoute from './routes/Detail'

export default (store) => ({
  path: 'platforms',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/PlatformsContainer').default
      cb(null, Account)
    }, 'platforms')
  },
  childRoutes: [
    PlatformCreateRoute(store),
    PlatformDetailRoute(store)
  ]
})
