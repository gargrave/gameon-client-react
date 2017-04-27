export default (store) => ({
  path: 'new',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PlatformCreate = require('./containers/PlatformCreateContainer').default
      cb(null, PlatformCreate)
    }, 'platform-create')
  }
})
