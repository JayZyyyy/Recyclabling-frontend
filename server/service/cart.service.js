const connection = require('../app/database')

class CartService {
  async addItem(commodityId, userId, num) {
    const statement = `INSERT INTO cart (commodityId, userId, num) VALUES (?, ?, ?)`
    try {
      const [result] = await connection.execute(statement, [commodityId, userId, num])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getCartList(userId, status) {
    const statement = `SELECT * FROM cart JOIN commodity ON cart.commodityId = commodity.id WHERE userId = ${userId} AND status = ${status};`
    const result = await connection.execute(statement)
    return result[0]
  }

  
  async getSoldOutList(userId, status) {
    const statement = `SELECT * FROM cart JOIN commodity ON cart.commodityId = commodity.id WHERE status = ${status} AND own = ${userId};`
    const [result] = await connection.execute(statement)
    return result
  }

  async getBuyList(userId, status) {
    const statement = `SELECT * FROM cart JOIN commodity ON cart.commodityId = commodity.id WHERE status = ${status} AND userId = ${userId};`
    const [result] = await connection.execute(statement)
    return result
  }


  async updateCart(userId, commodityId, num) {
    const statement = `UPDATE cart SET num = '${num}' AND updateAt = NOW() WHERE userId = ${userId} AND commodityId = ${commodityId}`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async deleteItem(userId, commodityId) {
    const statement = `DELETE FROM cart WHERE userId = ${userId} AND commodityId = ${commodityId};`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async checkoutCart(userId, commodityIdArr) {
    const status = 2;
    const statement = `UPDATE cart SET status = ${status}  WHERE userId = ${userId} AND commodityId IN (${commodityIdArr});`
    try {
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CartService()
