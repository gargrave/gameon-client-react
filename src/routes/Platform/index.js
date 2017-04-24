export default (store) => ({
  path: 'platforms',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/PlatformListContainer').default
      cb(null, Account)
    }, 'platforms')
  }
})
