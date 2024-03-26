const fs = require('fs')
const md5password = require('../utils/password-handle')
const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的数据
    const user = ctx.request.body
    // 查询数据
    const result = await userService.create(user)
    // 返回数据
    ctx.body = result
  }

  async getUserList(ctx, next) {
    // 查询数据
    const result = await userService.getUserList()
    // 返回数据
    ctx.body = result
  }
  async searchUser(ctx, next) {
    // 获取用户请求传递的数据
    const { userId } = ctx.params
    // 查询数据
    const result = await userService.searchUser(userId)
    // 返回数据
    ctx.body = result[0]
  }

  async deleteUser(ctx, next) {
    // 获取用户请求传递的数据
    const { id } = ctx.params
    // 查询数据
    const result = await userService.delete(id)
    // 返回数据
    ctx.body = result
  }

  async modifyInfo(ctx, next) {
    const { userId } = ctx.params
    const { name, email} = ctx.req.body

    // 查询数据
    const result = await userService.modifyInfo(userId, name, email)
    // 返回数据
    ctx.body = result
  }

  async modifyPassword(ctx, next) {
    const { userId } = ctx.params
    const { password } = ctx.req.body

    const newPass = md5password(password)
    // 查询数据
    const result = await userService.modifyPassword(userId, newPass)
    // 返回数据
    ctx.body = result
  }
}

module.exports = new UserController()
