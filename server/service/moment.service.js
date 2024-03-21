const connection = require('../app/database')

class momentService {
  async create(title, content, userId, filename, mimetype, size) {
    const statement = `INSERT moment SET title = '${title}', content = '${content}', userId = '${userId}', filename = '${filename}', mimetype = '${mimetype}', size = '${size}' , createAt = NOW()`
    const [result] = await connection.execute(statement, [title, content, userId, filename, mimetype, size])
    return result
  }


  async getMomentList() {
    const statement = `SELECT * FROM moment;`
    const [result] = await connection.execute(statement)
    return result
  }

  async getListById(userId) {
    const statement = `SELECT * FROM moment WHERE userId = '${userId}';`
    const [result] = await connection.execute(statement)
    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }


  async getFileByFilename(filename) {
    const statement = `SELECT * FROM moment WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }
}

module.exports = new momentService()
