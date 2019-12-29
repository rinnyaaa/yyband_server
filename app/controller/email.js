const Controller = require('egg').Controller

class EmailController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.EmailCreateTransfer = {
      email: { type: 'string', required: true, allowEmpty: false, format: /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/ },
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      // realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }

    // this.EmailUpdateTransfer = {
    //   mobile: { type: 'string', required: true, allowEmpty: false },
    //   realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    // }
  }

  async register() {
    const { ctx, service } = this
    const { code, email, role } = ctx.query
    const payload = {
      email,
      password: code,
      role
    }
    const res = await service.user.create(payload)
    ctx.helper.success({ ctx, res })
  }

  // 创建用户（注册）
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.EmailCreateTransfer)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.email.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }

  // 删除单个用户
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.email.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }

  // 修改用户
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserUpdateTransfer)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.email.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.email.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }

  // // 获取所有用户(分页/模糊)
  // async index() {
  //   const { ctx, service } = this
  //   // 组装参数
  //   const payload = ctx.query
  //   // 调用 Service 进行业务处理
  //   const res = await service.email.index(payload)
  //   // 设置响应内容和响应状态码
  //   ctx.helper.success({ctx, res})
  // }

  // // 删除所选用户(条件id[])
  // async removes() {
  //   const { ctx, service } = this
  //   // 组装参数
  //   // const payload = ctx.queries.id
  //   const { id } = ctx.request.body
  //   const payload = id.split(',') || []
  //   // 调用 Service 进行业务处理
  //   const result = await service.email.removes(payload)
  //   // 设置响应内容和响应状态码
  //   ctx.helper.success({ctx})
  // }

}


module.exports = EmailController