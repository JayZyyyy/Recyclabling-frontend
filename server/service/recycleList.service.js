const connection = require('../app/database')

class recycleListService {
  async getRecycleList(offset = 0, limit = 10) {
    const statement = `SELECT * FROM recycleList LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset + '', limit + ''])
    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM recycleList WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new recycleListService()
