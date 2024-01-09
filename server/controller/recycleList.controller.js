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
    // console.log('first')
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
}

module.exports = new RecycleListController()
