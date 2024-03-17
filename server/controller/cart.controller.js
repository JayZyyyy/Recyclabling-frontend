const commodityService = require('../service/commodity.service')  

class CartController {
  async addItem(ctx, next) {
    // const { commodityId, userId, count } = ctx.request.body
    console.log(ctx.params)
    
    ctx.body = '已成功添加'
  }
}

module.exports = new CartController()
