const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const momentRouter = new Router({ prefix: '/moment' })
const { create, list, getFileInfo, remove, getListById} = require('../controller/moment.controller')


momentRouter.post('/addMoment', verifyAuth, pictureHandler, create)
momentRouter.get('/', list)
momentRouter.get('/list/:userId', getListById)
momentRouter.get('/:filename', getFileInfo)
momentRouter.post('/delete/:momentId', verifyAuth, pictureHandler, remove)

module.exports = momentRouter
