const Router = require('koa-router')
const { create,searchUser, modifyInfo, modifyPassword,getUserList,deleteUser } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware.js')
const { pictureHandler } = require('../middleware/file.middleware')


const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', getUserList)
userRouter.post('/',verifyUser, handlePassword, create)
userRouter.post('/delete/:id', deleteUser)
userRouter.get('/:userId', searchUser)
userRouter.post('/modify/:userId', pictureHandler, modifyInfo)
userRouter.post('/password/:userId', pictureHandler, modifyPassword)
// userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
