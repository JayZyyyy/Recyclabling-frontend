const connection = require('../app/database')

class CommodityService {
  async getCommodityList() {
    const count = 0;
    const statement = `SELECT * FROM commodity WHERE count != ${count};`
    const [result] = await connection.execute(statement)
    return result
  }
  

  async getCommodityListById(id) {
    const count = 0;
    const statement = `SELECT * FROM commodity WHERE own = ${id} AND count != ${count};`
    const [result] = await connection.execute(statement)
    return result
  }

  async uploadNewCommodity(name, introduce, filename, mimetype, size, category, count, price, own) {
    const statement = `INSERT INTO commodity (name, introduce, filename, mimetype, size, category, count, price, own) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    try {
      const [result] = await connection.execute(statement, [name, introduce, filename, mimetype, size, category, count, price, own])
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


  async searchKeywordCommodity(keyword='', id) {
    const count = 0
    let statement = ''
    if (id) {
      statement = `SELECT * FROM commodity WHERE LOWER(name) LIKE '%${keyword.toLowerCase().trim()}%' AND own = ${id} AND count != ${count};`
    } else {
      statement = `SELECT * FROM commodity WHERE LOWER(name) LIKE '%${keyword.toLowerCase().trim()}%' AND count != ${count};`
    }
    const [result] = await connection.execute(statement)
    return result
  }

  async getCommodityByCategory(category = '') {
    const count = 0
    const statement = `SELECT * FROM commodity WHERE LOWER(category) LIKE '%${category.toLowerCase().trim()}%' AND count != ${count}`
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

  async updateCommodityCount(id, count) {
    const statement = `UPDATE commodity SET count = '${count}' WHERE id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateCommodityWithoutPic(id, name, introduce, category, count, price) {
    const statement = `UPDATE commodity SET name = '${name}', introduce = '${introduce}', category = '${category}', count = '${count}', price = '${price}' WHERE id = ${id}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CommodityService()
