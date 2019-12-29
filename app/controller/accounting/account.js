const Controller = require('egg').Controller

class AccountController extends Controller {
    constructor(ctx) {
        super(ctx)


        this.AccountUpdateTransfer = {
            accountName: { type: 'string', allowEmpty: false, required: false },
            budget: { type: 'int', allowEmpty: false, min: 0, required: false },
            wage: { type: 'int', allowEmpty: false, min: 0, required: false }
        }
    }


    // 创建账本（注册）
    // async create() {
    //     const { ctx, service } = this
    //     // 校验参数
    //     ctx.validate(this.AccountCreateTransfer)
    //         // 组装参数
    //     const payload = ctx.request.body || {}
    //         // 调用 Service 进行业务处理
    //     const res = await service.email.create(payload)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx, res })
    // }

    // 删除单个账本
    // async destroy() {
    //     const { ctx, service } = this
    //     // 校验参数
    //     const { id } = ctx.params
    //         // 调用 Service 进行业务处理
    //     await service.email.destroy(id)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx })
    // }

    // 修改账本
    async update() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(this.AccountUpdateTransfer)
            // 组装参数
            // const { id } = ctx.params
        const id = ctx.state.user.data.account

        const payload = ctx.request.body || {}

        const { createdAt, records, _user, _id } = payload
        if (createdAt || records || _user || _id) {
            ctx.throw("包含不允许修改的字段请重试", 500)
        }
        // 调用 Service 进行业务处理
        await service.accounting.account.update(id, payload)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    // 获取单个账本
    async show() {
        const { ctx, service } = this
        // 组装参数
        const _id = ctx.state.user.data.account

        // 调用 Service 进行业务处理
        const res = await service.accounting.account.show(_id)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // // 获取所有账本(分页/模糊)
    // async index() {
    //   const { ctx, service } = this
    //   // 组装参数
    //   const payload = ctx.query
    //   // 调用 Service 进行业务处理
    //   const res = await service.email.index(payload)
    //   // 设置响应内容和响应状态码
    //   ctx.helper.success({ctx, res})
    // }

    // // 删除所选账本(条件id[])
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


module.exports = AccountController