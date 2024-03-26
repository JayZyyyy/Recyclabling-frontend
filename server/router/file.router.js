const Router = require('koa-router')

const fileRouter = new Router({ prefix: '/upload' })

const { verifyAuth } = require('../middleware/auth.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const { savePictureInfo} = require('../controller/file.controller')

fileRouter.post('/picture', verifyAuth, pictureHandler,  savePictureInfo)

module.exports = fileRouter
