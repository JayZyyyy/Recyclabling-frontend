const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { addItem, getCartList, updateCart, deleteItem, checkoutCart, getSoldOutList, getBuyList} = require('../controller/cart.controller')
const { pictureHandler } = require('../middleware/file.middleware')
const cartRouter = new Router({ prefix: '/cart' })

cartRouter.get('/cartList/:id', verifyAuth, getCartList)
cartRouter.get('/cartSoldOutList/:id', verifyAuth, getSoldOutList)
cartRouter.get('/cartBuyList/:id',verifyAuth, getBuyList)
cartRouter.post('/addItem', verifyAuth, pictureHandler, addItem)
cartRouter.post('/update/:userId', verifyAuth, pictureHandler, updateCart)
cartRouter.post('/delete/:userId', verifyAuth, pictureHandler, deleteItem)
cartRouter.post('/checkout/:userId', verifyAuth, pictureHandler, checkoutCart)


module.exports = cartRouter
