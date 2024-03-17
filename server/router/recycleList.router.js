const Router = require('koa-router')

const recycleListRouter = new Router({ prefix: '/recycleList' })

const { getFileInfo, getRecycleList, getKeywordList, updateRecycleItem, updateRecycleItemWithoutPic} = require('../controller/recycleList.controller')

const { verifyAuth } = require('../middleware/auth.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const { saveInfo } = require('../controller/recycleList.controller')


recycleListRouter.get('/', getRecycleList)
recycleListRouter.get('/search/:keyword?', getKeywordList)
recycleListRouter.get('/:filename', getFileInfo)
recycleListRouter.post('/upload', verifyAuth, pictureHandler, saveInfo)
recycleListRouter.post('/update/:id', verifyAuth, pictureHandler, updateRecycleItem)
recycleListRouter.post('/update1/:id', verifyAuth, pictureHandler, updateRecycleItemWithoutPic)


module.exports = recycleListRouter
