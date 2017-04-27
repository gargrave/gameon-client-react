import axios from 'axios'

import { apiUrls } from '../../globals/urls'
import requests from '../../utils/requests'

export const types = {
  INITIALIZER_BEGIN: 'INITIALIZER_BEGIN',
  INITIALIZER_END: 'INITIALIZER_END'
}

export const actions = {
  init ({ username, password }) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: types.INITIALIZER_BEGIN })
      })
    }
  }
}
