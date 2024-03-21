const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, email, password } = user
    const statement = `INSERT INTO user (name, email, password) VALUES (?,?,?);`
    // 将user存储字数据库中
    const result = await connection.execute(statement, [name,email, password])
    return result[0]
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async searchUser(userId) {
    const statement = `SELECT * FROM user WHERE id = ?;`
    // 将user存储字数据库中
    const result = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new UserService()
