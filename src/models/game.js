export default {
  empty () {
    return {
      title: '',
      platform: undefined,
      finished: false,
      dates: []
    }
  },

  toAPI (data) {
    let payload = {
      title: data.title || '',
      platform: data.platform,
      finished: data.finished || false,
      dates: data.dates || []
    }

    if (data.id) {
      payload.id = data.id
    }

    if (data.datesRemoved) {
      payload.datesRemoved = data.datesRemoved
    }

    return payload
  },

  validation () {
    return {
      title: '',
      platform: '',
      finished: '',
      dates: ''
    }
  }
}
