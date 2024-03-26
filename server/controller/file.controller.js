const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files

    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file
      await fileService.createFile(filename, mimetype, size)
    }

    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController()
