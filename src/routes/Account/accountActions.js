import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import requests from '../../utils/requests'

export const types = {
  ACCOUNT_AJAX_BEGIN: 'ACCOUNT_AJAX_BEGIN',
  ACCOUNT_AJAX_END: 'ACCOUNT_AJAX_END',
  ACCOUNT_AJAX_ERROR: 'ACCOUNT_AJAX_ERROR',
  ACCOUNT_LOGIN: 'ACCOUNT_LOGIN',
  ACCOUNT_LOGOUT: 'ACCOUNT_LOGOUT',
  ACCOUNT_FETCH_USER_SUCCESS: 'ACCOUNT_FETCH_USER_SUCCESS',
  ACCOUNT_FETCH_USER_ERROR: 'ACCOUNT_FETCH_USER_ERROR'
}

export const actions = {
  login ({ username, password }) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: types.ACCOUNT_AJAX_BEGIN })
        setTimeout(() => {
          const req = requests.axPost(apiUrls.login, { username, password })
          axios(req)
            .then(res => {
              const token = res.data.key
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
                  err: 'err'
                })
                reject('Unknown error')
              }
            })
            .catch(err => {
              dispatch({ type: types.ACCOUNT_AJAX_END })
              dispatch({
                type: types.ACCOUNT_AJAX_ERROR,
                err
              })
              reject(err)
            })
        }, 650)
      })
    }
  },

  logout () {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        // all resolutions will be identical for this action,
        // so we are pre-defining the callback here
        const resolveNow = () => {
          localStorage.clear()
          dispatch({ type: types.ACCOUNT_LOGOUT })
          dispatch({ type: types.ACCOUNT_AJAX_END })
          resolve()
        }

        const token = getState().account.token
        if (!token) {
          // if we do not have a token, resolve early
          // no need for errors, since logging out is primarily client-oriented
          resolveNow()
        } else {
          dispatch({ type: types.ACCOUNT_AJAX_BEGIN })
          setTimeout(() => {
            const req = requests.axPost(apiUrls.logout, {}, token)

            axios.request(req)
              .then(() => { resolveNow() })
              .catch(() => {
                // we can safely disregard API errors here,
                // as clearing local data is the more important part
                resolveNow()
              })
          }, 400)
        }
      })
    }
  },

  /**
   * Sends a request to the API to fetch user/profile data. If the user is not
   * currently logged in (i.e. no token in the store), the request will be cancelled.
   * Note that this makes calls to two separate API endpoints: /user and /profile.
   */
  fetchUser () {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const token = getState().account.token
        if (!token) {
          reject('invalid token')
        } else {
          // GET request to User API endpoint
          const userReq = () => {
            const request = requests.axGet(apiUrls.users, token)
            return axios(request)
          }

          // GET request to Profile API endpoint
          const profileReq = () => {
            const request = requests.axGet(apiUrls.profiles, token)
            return axios(request)
          }

          dispatch({ type: types.ACCOUNT_AJAX_BEGIN })
          setTimeout(() => {
            axios.all([userReq(), profileReq()])
              .then(axios.spread((user, profile) => {
                dispatch({
                  type: types.ACCOUNT_FETCH_USER_SUCCESS,
                  user: user.data,
                  profile: profile.data
                })
                dispatch({ type: types.ACCOUNT_AJAX_END })
                resolve()
              }))
              .catch(err => {
                dispatch({ type: types.ACCOUNT_AJAX_END })
                dispatch({
                  type: types.ACCOUNT_AJAX_ERROR,
                  err: 'err'
                })
                reject(err)
              })
          }, 400)
        }
      })
    }
  },

  register () {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({
          type: types.ACCOUNT_AJAX_ERROR,
          err: 'err'
        })
        reject('not implemented')
      })
    }
  }
}
