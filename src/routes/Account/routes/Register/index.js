export default (store) => ({
  path: 'register',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Register = require('./containers/RegisterPageContainer').default
      cb(null, Register)
    }, 'register')
  }
})
