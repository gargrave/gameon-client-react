export const types = {
  INITIALIZER_BEGIN: 'INITIALIZER_BEGIN',
  INITIALIZER_END: 'INITIALIZER_END'
}

export const actions = {
  initBegin () {
    return (dispatch, getState) => {
      dispatch({ type: types.INITIALIZER_BEGIN })
    }
  },

  initEnd () {
    return (dispatch, getState) => {
      dispatch({ type: types.INITIALIZER_END })
    }
  }
}
