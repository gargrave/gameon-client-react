export default {
  findRecordById (records, id) {
    let record = records.filter(record => Number(record.id) === Number(id))
    if (record.length) {
      return record[0]
    }
    return null
  }
}
