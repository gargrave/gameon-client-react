export default (store) => ({
  path: 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const GameCreate = require('./containers/GameCreateContainer').default
      cb(null, GameCreate)
    }, 'game-create')
  }
})
