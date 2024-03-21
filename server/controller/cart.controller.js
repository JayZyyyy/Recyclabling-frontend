const cartService = require('../service/cart.service')  
const commodityService = require('../service/commodity.service')

class CartController {
  async getCartList(ctx, next) {
    const { id } = ctx.params
    const status = 1
    const result = await cartService.getCartList(id, status)
    ctx.body = result
  }

  async getSoldOutList(ctx, next) {
    const { id } = ctx.params
    const status = 2
    const result = await cartService.getSoldOutList(id, status)
    ctx.body = result
  }

  async getBuyList(ctx, next) {
    const { id } = ctx.params
    const status = 2
    const result = await cartService.getBuyList(id, status)
    ctx.body = result
  }

  async addItem(ctx, next) {
    const { commodityId, userId, num } = ctx.req.body
    const status = 1
    const cartList = await cartService.getCartList(userId, status)
    let isAlive = false
    let finalNum = 0
    cartList.find((obj) => {
      if (obj.commodityId === +commodityId && obj.userId === +userId) {
        isAlive = true
        finalNum = +num + obj.num
        return
      }
      return false
    })
    if (isAlive) {
      await cartService.updateCart(userId, commodityId, finalNum)
    }else {
      await cartService.addItem(commodityId, userId, num)
    }
    ctx.body = '已成功添加'
  }

  async updateCart(ctx, next) {
    const {commodityId, num} = ctx.req.body
    const { userId } = ctx.params
    await cartService.updateCart(userId, commodityId, num)
    ctx.body = '更新成功'
  }

  async deleteItem(ctx, next) {
    const {commodityId} = ctx.req.body
    const { userId } = ctx.params
    await cartService.deleteItem(userId, commodityId)
    ctx.body = '删除成功'
  }

 

  async checkoutCart(ctx, next) {
    const { cartArr } = ctx.req.body
    const { userId } = ctx.params

    const commodityList = await commodityService.getCommodityList()
    const jsonCartArr = JSON.parse(cartArr)

    const commodityIdArr = []
    const matchingObjects = [];
    jsonCartArr.forEach(obj1 => {
      const matchingObj = commodityList.find(obj2 => obj1.commodityId === obj2.id);
      if (matchingObj) {
        matchingObjects.push(matchingObj);
        commodityIdArr.push(matchingObj.id)
      }
      });
    const isConfirm = compareCounts(jsonCartArr, matchingObjects)
    
    if(isConfirm) {
      await cartService.checkoutCart(userId, commodityIdArr)

      isConfirm.forEach(async (obj) => {
        await commodityService.updateCommodityCount(obj.id, obj.count)
      })
      ctx.body = {
        message: '结算成功',
        status: 200
      }
    } else {
      ctx.body="结算失败，商品库存不足"
    }
  }


}

const compareCounts = (arr1, arr2) => {
  // 创建映射对象，将数组2中的 id 或者 commodityId 作为键，count 作为值
  const countMap = {};
  arr2.forEach(obj => {
    countMap[obj.id || obj.commodityId] = obj.count;
  });

  const changedArr = []
  // 遍历数组1中的每个对象
  for (const obj of arr1) {
    // 获取对应的 count
    const count = countMap[obj.id || obj.commodityId];
    
    // 如果 count 存在且大于当前对象的 count
    if (count !== undefined && count < obj.num) {
      return false;
    }

    if (count !== undefined && count >= obj.num) {
      changedArr.push({...obj, count: count - obj.num})
    }
  }

  return changedArr;
}

module.exports = new CartController()
