const connection = require('../app/database')

class FileService {
  async createFile(filename, mimetype, size) {
    const statement = `INSERT INTO recycleList (filename, mimetype, size) VALUES (?, ?, ?)`
    try {
      const [result] = await connection.execute(statement, [filename, mimetype, size])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new FileService()
