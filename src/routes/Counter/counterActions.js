export const types = {
  COUNTER_AJAX_BEGIN: 'COUNTER_AJAX_BEGIN',
  COUNTER_AJAX_END: 'COUNTER_AJAX_END',
  COUNTER_AJAX_ERROR: 'COUNTER_AJAX_ERROR',
  COUNTER_INCREMENT: 'COUNTER_INCREMENT',
  COUNTER_DOUBLE_ASYNC: 'COUNTER_DOUBLE_ASYNC',
  COUNTER_API_TEST: 'COUNTER_API_TEST',
  USERNAME_TAKEN: 'USERNAME_TAKEN',
  USERNAME_AVAILABLE: 'USERNAME_AVAILABLE'
}

export const actions = {
  increment: (value = 1) => {
    return {
      type: types.COUNTER_INCREMENT,
      payload: value
    }
  },

  /*  This is a thunk, meaning it is a function that immediately
      returns a function for lazy evaluation. It is incredibly useful for
      creating async actions, especially when combined with redux-thunk! */

  doubleAsync: () => {
    return (dispatch, getState) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch({
            type: types.COUNTER_DOUBLE_ASYNC,
            payload: getState().counter.count
          })
          resolve()
        }, 200)
      })
    }
  },

  checkUser: (username) => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        dispatch({ type: types.COUNTER_AJAX_BEGIN })
        setTimeout(() => {
          dispatch({ type: types.USERNAME_AVAILABLE })
          dispatch({ type: types.COUNTER_AJAX_END })
          resolve(data)
        }, 1000)
      })
    }
  }
}
