const connection = require('../app/database')

class recycleListService {
  // async getRecycleList(offset = 0, limit = 8) {
  //   const statement = `SELECT * FROM recycleList LIMIT ?, ?;`
  //   const [result] = await connection.execute(statement, [offset + '', limit + ''])
  //   return result
  // }

  async getRecycleList() {
    const statement = `SELECT * FROM recycleList;`
    const [result] = await connection.execute(statement)
    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM recycleList WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }

  async createRecycleItem(name, introduce, filename, mimetype, size) {
    const statement = `INSERT INTO recycleList (name, introduce, filename, mimetype, size) VALUES (?, ?, ?, ?, ?)`
    try {
      const [result] = await connection.execute(statement, [name, introduce, filename, mimetype, size])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async searchKeywordList(keyword='') {
    const statement = `SELECT * FROM recycleList WHERE LOWER(name) LIKE '%${keyword.toLowerCase().trim()}%'`
    const [result] = await connection.execute(statement)
    return result
  }

  async updateRecycleItem(id, name, introduce, filename, mimetype, size) {
    const statement = `UPDATE recycleList SET name = '${name}', introduce = '${introduce}', filename = '${filename}', mimetype = '${mimetype}', size = '${size}' WHERE id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new recycleListService()
