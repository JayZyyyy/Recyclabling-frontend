const fs = require('fs')

const momentService = require('../service/moment.service')
const commentService = require('../service/comment.service')
const { PICTURE_PATH } = require('../constants/file.path')

class MomentController {
  async create(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files
    const {title, content, userId} = ctx.req.body

    let result = []
    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file
      result = await momentService.create(title, content, userId, filename, mimetype, size)
      
    }
    // 2. 把数据插入到数据库中
    ctx.body = '成功上传新动态'
  }

  async detail(ctx, next) {
    // 1. 获取数据
    const momentId = ctx.params.momentId
    // 2. 查询数据
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const result = await momentService.getMomentList()
    ctx.body = result
  }

  async getListById(ctx, next) {
    const {userId} = ctx.params
    const result = await momentService.getListById(userId)
    ctx.body = result
  }

  async getKeywordMoment(ctx, next) {
    const  {keyword} = ctx.params;
    const keywordMoment = await momentService.searchKeywordMoment(keyword)
    ctx.body = keywordMoment
  }


  async update(ctx, next) {
    // 1. 获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    const result = await momentService.update(content, momentId)
    ctx.body = result
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params

    await commentService.removeCommentsByMomentId(momentId)

    // 2.删除内容
    const result = await momentService.remove(momentId)
    ctx.body = result
  }


  async getFileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await momentService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`) 
  }

}

module.exports = new MomentController()
