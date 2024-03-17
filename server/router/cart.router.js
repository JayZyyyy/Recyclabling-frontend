const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { addItem } = require('../controller/cart.controller')

const cartRouter = new Router({ prefix: '/cart' })

cartRouter.post('/addItem/:id', verifyAuth, addItem)

module.exports = cartRouter
