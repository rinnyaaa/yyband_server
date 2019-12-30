const Controller = require('egg').Controller

class RecordController extends Controller {
    constructor(ctx) {
        super(ctx)

        this.RecordCreateTransfer = {
            consumption: { type: 'number', required: true, allowEmpty: false, min: 0 },
            isOut: { type: 'boolean', required: true, allowEmpty: false },
            typeId: { type: 'string', required: true, allowEmpty: false },
            remarks: { type: 'string', required: false, allowEmpty: false },
        }

    }


    //创建记账记录
    async create() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(this.RecordCreateTransfer)
            // 组装参数
        const _account = ctx.state.user.data.account
        const _user = ctx.state.user.data._id
        const payload = ctx.request.body || {}
            // 调用 Service 进行业务处理
        const res = await service.accounting.record.create({ _account, _user, ...payload })
            //账本增加这条记录
        await service.accounting.account.addRecord(_account, res)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 删除单个记账记录
    // async destroy() {
    //     const { ctx, service } = this
    //     // 校验参数
    //     const { id } = ctx.params
    //         // 调用 Service 进行业务处理
    //     await service.email.destroy(id)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx })
    // }

    // 修改记账记录
    // async update() {
    //     const { ctx, service } = this
    //     // 校验参数
    //     ctx.validate(this.RecordUpdateTransfer)
    //         // 组装参数
    //         // const { id } = ctx.params
    //     const id = ctx.state.user.data.record

    //     const payload = ctx.request.body || {}

    //     const { createdAt, records, _user, _id } = payload
    //     if (createdAt || records || _user || _id) {
    //         ctx.throw("包含不允许修改的字段请重试", 500)
    //     }
    //     // 调用 Service 进行业务处理
    //     await service.accounting.record.update(id, payload)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx })
    // }

    // 获取单个记账记录
    // async show() {
    //     const { ctx, service } = this
    //     // 组装参数
    //     const _id = ctx.state.user.data.record

    //     // 调用 Service 进行业务处理
    //     const res = await service.accounting.record.show(_id)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx, res })
    // }

    // 获取最近两个记账记录
    async showRecent() {
        const { ctx, service } = this
        // 组装参数
        const accountId = ctx.state.user.data.account
        const { count } = ctx.params
            // 调用 Service 进行业务处理
        const res = await service.accounting.record.showRecent(accountId, count)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 获取所有记账记录(分页/模糊)
    // async index() {
    //     const { ctx, service } = this
    //     // 组装参数
    //     const payload = ctx.query
    //         // 调用 Service 进行业务处理
    //     const res = await service.accounting.record.index(payload)
    //         // 设置响应内容和响应状态码
    //     ctx.helper.success({ ctx, res })
    // }

    // // 删除所选记账记录(条件id[])
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
    async recordsByMonth() {
        const { ctx, service } = this
        // 组装参数
        const accountId = ctx.state.user.data.account
            // 调用 Service 进行业务处理
        const res = await service.accounting.record.recordsByMonth(accountId)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }
}


module.exports = RecordController