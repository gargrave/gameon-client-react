export default {
  buildForUpdate (data) {
    return {
      id: data.id,
      title: data.title || ''
    }
  }
}
