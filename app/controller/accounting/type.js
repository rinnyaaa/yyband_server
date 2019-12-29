const Controller = require('egg').Controller

class RecordController extends Controller {
    constructor(ctx) {
        super(ctx)

        this.RecordCreateTransfer = {
            name: { type: 'string', required: true, allowEmpty: false },
        }

        this.RecordUpdateTransfer = {
            name: { type: 'string', required: true, allowEmpty: false },
        }

    }


    //创建记账类型
    async create() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(this.RecordCreateTransfer)
            // 组装参数
        const payload = ctx.request.body || {}
            // 调用 Service 进行业务处理
        const res = await service.accounting.type.create(payload)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 删除单个记账类型
    async destroy() {
        const { ctx, service } = this
        // 校验参数
        const { id } = ctx.params
            // 调用 Service 进行业务处理
        await service.accounting.type.destroy(id)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    // 修改记账类型
    async update() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(this.RecordUpdateTransfer)
            // 组装参数
        const { id } = ctx.params

        const payload = ctx.request.body || {}
            // 调用 Service 进行业务处理
        await service.accounting.type.update(id, payload)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    // 获取单个记账类型
    async show() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        console.log(id)
            // 调用 Service 进行业务处理
        const res = await service.accounting.type.show(id)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }


    // 获取所有记账类型(分页/模糊)
    async index() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.query
        console.log(payload)

        // 调用 Service 进行业务处理
        const res = await service.accounting.type.index(payload)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    // 删除所选记账类型(条件id[])
    async removes() {
        const { ctx, service } = this
        // 组装参数
        // const payload = ctx.queries.id
        const { id } = ctx.request.body
        const payload = id.split(',') || []
            // 调用 Service 进行业务处理
        const result = await service.accounting.type.removes(payload)
            // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

}


module.exports = RecordController