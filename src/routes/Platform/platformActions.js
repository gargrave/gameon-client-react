import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import requests from '../../utils/requests'

export const types = {
  PLATFORMS_AJAX_BEGIN: 'PLATFORMS_AJAX_BEGIN',
  PLATFORMS_AJAX_END: 'PLATFORMS_AJAX_END',
  PLATFORMS_FETCH_SUCCESS: 'PLATFORMS_FETCH_SUCCESS',
  PLATFORMS_FETCH_ERROR: 'PLATFORMS_FETCH_ERROR'
}

export const actions = {
  /**
   * Fetches the full list of user's Platforms from the API.
   */
  fetchPlatforms () {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const token = getState().account.token
        if (!token) {
          reject('invalid token')
        } else {
          dispatch({ type: types.PLATFORMS_AJAX_BEGIN })
          setTimeout(() => {
            const req = requests.axGet(apiUrls.platforms, token)
            axios.request(req)
              .then(res => {
                const items = res.data.results
                dispatch({
                  type: types.PLATFORMS_FETCH_SUCCESS,
                  items
                })
                dispatch({ type: types.PLATFORMS_AJAX_END })
                resolve()
              })
              .catch(err => {
                dispatch({ type: types.PLATFORMS_AJAX_END })
                dispatch({
                  type: types.PLATFORMS_FETCH_ERROR,
                  err: 'err'
                })
                reject(err)
              })
          }, 400)
        }
      })
    }
  }
}
