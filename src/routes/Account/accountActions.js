import request from 'superagent'

export const types = {
  ACCOUNT_AJAX_BEGIN: 'ACCOUNT_AJAX_BEGIN',
  ACCOUNT_AJAX_END: 'ACCOUNT_AJAX_END',
  ACCOUNT_AJAX_ERROR: 'ACCOUNT_AJAX_ERROR',
  ACCOUNT_LOGIN: 'ACCOUNT_LOGIN',
  ACCOUNT_LOGOUT: 'ACCOUNT_LOGOUT'
}

export const actions = {
  login ({ username, password }) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: types.ACCOUNT_AJAX_BEGIN })
        setTimeout(() => {
          request
            .post('http://localhost:8000/rest-auth/login/')
            .set('Accept', 'application/json')
            .send({ username, password })
            .end((err, res) => {
              if (err) {
                dispatch({ type: types.ACCOUNT_AJAX_END })
                dispatch({
                  type: types.ACCOUNT_AJAX_ERROR,
                  err
                })
                reject(err)
              } else {
                const token = res.body.key
                if (token) {
                  localStorage.setItem('token', token)
                  dispatch({
                    type: types.ACCOUNT_LOGIN,
                    token
                  })
                  dispatch({ type: types.ACCOUNT_AJAX_END })
                  resolve(res)
                } else {
                  dispatch({ type: types.ACCOUNT_AJAX_END })
                  dispatch({
                    type: types.ACCOUNT_AJAX_ERROR,
                    err
                  })
                  reject('Unknown error')
                }
              }
            })
        }, 650)
      })
    }
  },

  logout (token) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: types.ACCOUNT_AJAX_BEGIN })
        setTimeout(() => {
          request
            .post('http://localhost:8000/rest-auth/logout/')
            .set('Accept', 'application/json')
            .set('Authorization', `Token ${token}`)
            .end((err, res) => {
              if (err) { }
              localStorage.clear()
              dispatch({ type: types.ACCOUNT_LOGOUT })
              dispatch({ type: types.ACCOUNT_AJAX_END })
              resolve(res)
            })
        }, 400)
      })
    }
  }
}
