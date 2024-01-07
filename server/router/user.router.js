const Router = require('koa-router')
const { create,searchUser } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware.js')


const userRouter = new Router({ prefix: '/user' })


userRouter.post('/',verifyUser, handlePassword, create)
userRouter.get('/:userId', searchUser)
// userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
