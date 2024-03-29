const fs = require('fs')
const { PICTURE_PATH } = require('../constants/file.path')
const commodityService = require('../service/commodity.service')

class CommodityController {
  async getCommodityList(ctx, next) {
     //  1. 获取数据(offset/size)
    const { offset, limit } = ctx.query
     // 2. 查询列表
    const result = await commodityService.getCommodityList(offset, limit)
    ctx.body = result
  }

  async getCommodityListById(ctx, next) {
    //  1. 获取数据(offset/size)
  const { id } = ctx.params
    // 2. 查询列表
   const result = await commodityService.getCommodityListById(id)
   ctx.body = result
 }

  async getFileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await commodityService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`) 
  }

  // uploadCommodity 上传新商品
  async uploadCommodity(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files
    const {name, introduce, category, count, price, own} = ctx.req.body

    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file
      await commodityService.uploadNewCommodity(name, introduce, filename, mimetype, size, category, count, price, own)
    }

    ctx.body = '上传成功~'
  }


  async getKeywordCommodity(ctx, next) {
    const { id, keyword } = ctx.query;
    const keywordCommodity = await commodityService.searchKeywordCommodity(keyword, id)
    ctx.body = keywordCommodity
  }

  async getCommodityByCategory(ctx, next) {
    const { category } = ctx.params
    if (category === '全部') {
      const result = await commodityService.getCommodityList()
      ctx.body = result
    } else {
      const CommodityList = await commodityService.getCommodityByCategory(category)
      ctx.body = CommodityList
    }
    
  }

  async modifyCommodity(ctx, next) {
    const files = ctx.req.files
    const {name, introduce, category, count, price} = ctx.req.body
    const { id } = ctx.params
    for (let file of files) {
      const { filename, mimetype, size } = file
      
      await commodityService.updateCommodity(id, name, introduce, category, count, price, filename, mimetype, size)
    }

    ctx.body = '更新成功'
  }

  async modifyCommodityWithoutPic(ctx, next) {
    const {name, introduce, category, count, price} = ctx.req.body
    const { id } = ctx.params
    await commodityService.updateCommodityWithoutPic(id, name, introduce, category, count, price)

    ctx.body = '更新成功'
  }
}

module.exports = new CommodityController()
