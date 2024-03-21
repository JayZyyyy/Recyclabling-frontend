const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const commentRouter = new Router({ prefix: '/comment' })
const { create, list} = require('../controller/comment.controller')


commentRouter.get('/:momentId', list)
commentRouter.post('/addComment', verifyAuth, pictureHandler, create)


module.exports = commentRouter
