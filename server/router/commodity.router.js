const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const { uploadCommodity, getCommodityList, getFileInfo, getKeywordCommodity, getCommodityByCategory, getCommodityListById, modifyCommodity, modifyCommodityWithoutPic} = require('../controller/commodity.controller')

const commodityRouter = new Router({ prefix: '/commodity' })

commodityRouter.get('/', getCommodityList)
commodityRouter.get('/user/:id', getCommodityListById)
commodityRouter.get('/search', getKeywordCommodity)
commodityRouter.get('/:filename', getFileInfo)
commodityRouter.post('/upload', verifyAuth, pictureHandler, uploadCommodity)
commodityRouter.post('/modify/:id',verifyAuth, pictureHandler, modifyCommodity)
commodityRouter.post('/modify1/:id',verifyAuth, pictureHandler, modifyCommodityWithoutPic)
commodityRouter.get('/category/:category?', getCommodityByCategory)


module.exports = commodityRouter
