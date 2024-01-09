const Router = require('koa-router')

const recycleListRouter = new Router({ prefix: '/recycleList' })

const { getFileInfo, getRecycleList } = require('../controller/recycleList.controller')

recycleListRouter.get('/', getRecycleList)
recycleListRouter.get('/:filename', getFileInfo)


module.exports = recycleListRouter
