const Controller = require('egg').Controller

class WxController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.WxCreateTransfer = {
      code: { type: 'string', required: true, allowEmpty: false },
    }
  }

  // 创建用户（注册）
  async wxLogin() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.WxCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.wx.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  

}


module.exports = WxController