import GameCreateRoute from './routes/Create'
import GameDetailRoute from './routes/Detail'

export default (store) => ({
  path: 'games',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/GamesContainer').default
      cb(null, Account)
    }, 'games')
  },
  childRoutes: [
    GameCreateRoute(store),
    GameDetailRoute(store)
  ]
})
