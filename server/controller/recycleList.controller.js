const fs = require('fs')
const { PICTURE_PATH } = require('../constants/file.path')
const recycleListService = require('../service/recycleList.service') 

class RecycleListController {
  async getRecycleList(ctx, next) {
    //  1. 获取数据(offset/size)
    const { offset, limit } = ctx.query
     // 2. 查询列表
    const result = await recycleListService.getRecycleList(offset, limit)
    ctx.body = result
  }

  async getFileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await recycleListService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`) 
  }

  async getKeywordList(ctx, next) {
    const { keyword } = ctx.params
    const keywordList = await recycleListService.searchKeywordList(keyword)
    ctx.body = keywordList
  }

  async saveInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files
    const {name, introduce} = ctx.req.body

    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file
      await recycleListService.createRecycleItem(name, introduce, filename, mimetype, size)
    }

    ctx.body = '上传成功~'
  }

  async updateRecycleItem(ctx, next) {
    const files = ctx.req.files
    const { name, introduce} = ctx.req.body
    const { id } = ctx.params

    for (let file of files) {
      const { filename, mimetype, size } = file
      await recycleListService.updateRecycleItem(id, name, introduce, filename, mimetype, size)
    }

    ctx.body = '更新成功'
  }

  async updateRecycleItemWithoutPic(ctx, next) {
    const files = ctx.req.files
    const { name, introduce} = ctx.req.body
    const { id } = ctx.params
    
    await recycleListService.updateRecycleItemWithoutPic(id, name, introduce)
    ctx.body = '更新成功'
  }

}

module.exports = new RecycleListController()
