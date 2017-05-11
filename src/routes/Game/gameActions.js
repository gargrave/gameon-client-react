import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import requests from '../../utils/requests'

export const types = {
  GAMES_AJAX_BEGIN: 'GAMES_AJAX_BEGIN',
  GAMES_AJAX_END: 'GAMES_AJAX_END',
  GAMES_FETCH_SUCCESS: 'GAMES_FETCH_SUCCESS',
  GAMES_FETCH_ERROR: 'GAMES_FETCH_ERROR',
  GAMES_CREATE_SUCCESS: 'GAMES_CREATE_SUCCESS',
  GAMES_CREATE_ERROR: 'GAMES_CREATE_ERROR',
  GAMES_UPDATE_SUCCESS: 'GAMES_UPDATE_SUCCESS',
  GAMES_UPDATE_ERROR: 'GAMES_UPDATE_ERROR'
}

export const actions = {
  /**
   * Fetches the full list of user's Games from the API.
   */
  fetchGames () {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const token = getState().account.token
        if (!token) {
          reject('invalid token')
        } else {
          dispatch({ type: types.GAMES_AJAX_BEGIN })
          setTimeout(() => {
            const req = requests.axGet(apiUrls.games, token)
            axios.request(req)
              .then(res => {
                const items = res.data.results
                dispatch({
                  type: types.GAMES_FETCH_SUCCESS,
                  items
                })
                dispatch({ type: types.GAMES_AJAX_END })
                resolve()
              })
              .catch(err => {
                dispatch({ type: types.GAMES_AJAX_END })
                dispatch({
                  type: types.GAMES_FETCH_ERROR,
                  err: 'err'
                })
                reject(err)
              })
          }, 450)
        }
      })
    }
  },

  /**
   * Sends a request to the API to create a new Game instance.
   * @param {Object} gameData - The data to send to the API. Should have the following form:
   * {
   *    title: [string]
   * }
   */
  createGame (gameData) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const token = getState().account.token
        if (!token) {
          reject('invalid token')
        } else {
          dispatch({ type: types.GAMES_AJAX_BEGIN })
          setTimeout(() => {
            const req = requests.axPost(apiUrls.games, gameData, token)
            axios.request(req)
              .then(res => {
                const game = res.data
                dispatch({ type: types.GAMES_AJAX_END })
                dispatch({
                  type: types.GAMES_CREATE_SUCCESS,
                  game
                })
                resolve(game)
              })
              .catch(() => {
                dispatch({ type: types.GAMES_AJAX_END })
                dispatch({ type: types.GAMES_CREATE_ERROR })
                reject()
              })
          }, 450)
        }
      })
    }
  },

  updateGame (gameData) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const token = getState().account.token
        if (!token) {
          reject('invalid token')
        } else {
          dispatch({ type: types.GAMES_AJAX_BEGIN })
          setTimeout(() => {
            const url = `${apiUrls.games}${gameData.id}`
            const req = requests.axPut(url, gameData, token)
            axios.request(req)
              .then(res => {
                const game = res.data
                dispatch({ type: types.GAMES_AJAX_END })
                dispatch({
                  type: types.GAMES_UPDATE_SUCCESS,
                  game
                })
                resolve(game)
              })
              .catch(() => {
                dispatch({ type: types.GAMES_AJAX_END })
                dispatch({ type: types.GAMES_UPDATE_ERROR })
                reject()
              })
          }, 500)
        }
      })
    }
  }
}
