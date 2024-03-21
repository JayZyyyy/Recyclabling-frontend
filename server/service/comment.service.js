const connection = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT comment SET content = '${content}', momentId = '${momentId}', userId = '${userId}', createAt = NOW()`
    const [result] = await connection.execute(statement, [content, momentId, userId])
    return result
  }

  async getCommentsByMomentId(momentId) {
    const statement = `SELECT * FROM comment JOIN user ON user.id = comment.userId WHERE momentId = '${momentId}'`
    const [result] = await connection.execute(statement)
    return result
  }

  async removeCommentsByMomentId(momentId) {
    const statement = `DELETE FROM comment WHERE momentId = '${momentId}'`
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new CommentService()
