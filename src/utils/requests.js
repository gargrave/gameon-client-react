const defaultRequest = (method, url) => ({
  method,
  headers: {
    'Accept': 'application/json'
  },
  url
})

export default {
  /**
   * Builds a GET AJAX request formatted for the Axios library.
   * Mostly just a shortcut to save writing everything out over and over
   */
  axGet (url, authToken = null) {
    let req = defaultRequest('get', url)

    if (authToken) {
      req.headers['Authorization'] = `Token ${authToken}`
    }

    return req
  },

  /**
   * Builds a POST AJAX request formatted for the Axios library.
   */
  axPost (url, data, token = null) {
    let req = Object.assign({}, defaultRequest('post', url), { data })

    if (token) {
      req.headers['Authorization'] = `Token ${token}`
    }

    return req
  },

  /**
   * Builds a PUT AJAX request formatted for the Axios library.
   */
  axPut (url, data, token = null) {
    let req = Object.assign({}, defaultRequest('put', url), { data })

    if (token) {
      req.headers['Authorization'] = `Token ${token}`
    }

    return req
  }
}
