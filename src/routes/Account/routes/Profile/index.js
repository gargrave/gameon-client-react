export default (store) => ({
  path: 'profile',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Account = require('./containers/ProfilePageContainer').default
      cb(null, Account)
    }, 'profile')
  }
})
