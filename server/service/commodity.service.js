const connection = require('../app/database')

class CommodityService {
  async getCommodityList() {
    const statement = `SELECT * FROM commodity;`
    const [result] = await connection.execute(statement)
    return result
  }
  

  async getCommodityListById(id) {
    const statement = `SELECT * FROM commodity WHERE own = ${id};`
    const [result] = await connection.execute(statement)
    return result
  }

  async uploadNewCommodity(name, introduce, filename, mimetype, size, category, count, price) {
    const statement = `INSERT INTO commodity (name, introduce, filename, mimetype, size, category, count, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    try {
      const [result] = await connection.execute(statement, [name, introduce, filename, mimetype, size, category, count, price])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM commodity WHERE filename = ?;`
    const [result] = await connection.execute(statement, [filename])
    return result[0]
  }


  async searchKeywordCommodity(keyword='') {
    const statement = `SELECT * FROM commodity WHERE LOWER(name) LIKE '%${keyword.toLowerCase().trim()}%'`
    const [result] = await connection.execute(statement)
    return result
  }

  async getCommodityByCategory(category = '') {
    const statement = `SELECT * FROM commodity WHERE LOWER(category) LIKE '%${category.toLowerCase().trim()}%'`
    const [result] = await connection.execute(statement)
    return result
  }


  async updateCommodity(id, name, introduce, category, count, price, filename, mimetype, size) {
    const statement = `UPDATE commodity SET name = '${name}', introduce = '${introduce}', filename = '${filename}', mimetype = '${mimetype}', size = '${size}', category = '${category}', count = '${count}', price = '${price}' WHERE id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CommodityService()
