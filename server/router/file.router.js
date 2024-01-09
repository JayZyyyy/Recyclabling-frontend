const Router = require('koa-router')

const fileRouter = new Router({ prefix: '/upload' })

const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware')
const { saveAvatarInfo, savePictureInfo} = require('../controller/file.controller')

fileRouter.post('/picture', verifyAuth, pictureHandler,  savePictureInfo)

module.exports = fileRouter
