const jwt = require('jsonwebtoken')
const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2. 判断用户名或密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    ctx.body = {
      status: 400,
      message: '用户名或者密码不能为空'
    }
    return {
      status: 400,
      message: '用户名或者密码不能为空'
    }
  }

  // 3. 判断用户是否存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    ctx.body = {
      status: 400,
      message: "不存在该用户"
    }
    return {
      status: 400,
      message: "不存在该用户"
    }
  }

  // 4. 判断密码是否是和数据库中的密码一致
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    ctx.body = {
      status: 400,
      message: "密码是错误的，请重新输入~"
    }
    return {
      status: 400,
      message: "密码是错误的，请重新输入~"
    }
  }

  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 1. 授权获取的token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.body = {
      status: 401,
      message: '用户凭证已过期，请重新登录'
    }
  }
  const token = authorization.replace('Bearer ', '')
  // 2. 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (err) {
    ctx.body = {
      status: 401,
      message: '用户凭证已过期，请重新登录'
    }
  }
}

module.exports = { verifyLogin, verifyAuth }
