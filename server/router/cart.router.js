const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { addItem, getCartList, updateCart, deleteItem, checkoutCart} = require('../controller/cart.controller')
const { pictureHandler } = require('../middleware/file.middleware')
const cartRouter = new Router({ prefix: '/cart' })

cartRouter.get('/cartList/:id', verifyAuth, getCartList)
cartRouter.post('/addItem', verifyAuth, pictureHandler, addItem)
cartRouter.post('/update/:userId', verifyAuth, pictureHandler, updateCart)
cartRouter.post('/delete/:userId', verifyAuth, pictureHandler, deleteItem)
cartRouter.post('/checkout/:userId', verifyAuth, pictureHandler, checkoutCart)


module.exports = cartRouter
