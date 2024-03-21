const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content, userId } = ctx.req.body
    const result = await commentService.create(momentId, content, userId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { momentId } = ctx.params
    const result = await commentService.getCommentsByMomentId(momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
