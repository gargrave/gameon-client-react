export default (store) => ({
  path: ':id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const GameDetail = require('./containers/GameDetailContainer').default
      cb(null, GameDetail)
    }, 'game-detail')
  }
})
