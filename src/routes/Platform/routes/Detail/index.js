export default (store) => ({
  path: ':id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PlatformDetail = require('./containers/PlatformDetailContainer').default
      cb(null, PlatformDetail)
    }, 'platform-detail')
  }
})
