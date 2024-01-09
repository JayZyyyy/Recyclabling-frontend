const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { id, name, admin } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = { id, name, token, admin }
  }

  async success(ctx, next) {
    ctx.body = 'success'
  }
}

module.exports = new AuthController()
