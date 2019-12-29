'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
    // create======================================================================================================>
    async create(payload) {
        const { ctx, service } = this
        const count = await ctx.model.Accounting.Type.count({})
        return ctx.model.Accounting.Type.create({...payload, id: count })
    }

    // destroy======================================================================================================>  
    async destroy(_id) {
        const { ctx, service } = this
        const type = await ctx.service.accounting.type.find(_id)
        if (!type) {
            ctx.throw(404, '类型不存在')
        }
        return ctx.model.Accounting.Type.findByIdAndRemove(_id)
    }

    // update======================================================================================================>
    async update(_id, payload) {
        const { ctx, service } = this
        const type = await ctx.service.accounting.type.find(_id)
        if (!type) {
            ctx.throw(404, '类型不存在')
        }
        return ctx.model.Accounting.Type.findByIdAndUpdate(_id, payload)
    }


    // show======================================================================================================>
    async show(_id) {
        const type = await this.ctx.service.accounting.type.find(_id)
        if (!type) {
            this.ctx.throw(404, '类型不存在')
        }
        return this.ctx.model.Accounting.Type.findById(_id)
    }

    // index======================================================================================================>
    async index(payload) {
        // const { currentPage, pageSize, isPaging, search } = payload
        // let res = []
        // let count = 0
        // let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
        // if (isPaging) {
        //     if (search) {
        //         res = await this.ctx.model.Type.find({ email: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        //         count = res.length
        //     } else {
        //         res = await this.ctx.model.Type.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        //         count = await this.ctx.model.Type.count({}).exec()
        //     }
        // } else {
        //     if (search) {
        //         res = await this.ctx.model.Type.find({ email: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        //         count = res.length
        //     } else {
        //         res = await this.ctx.model.Type.find({}).populate('role').sort({ createdAt: -1 }).exec()
        //         count = await this.ctx.model.Type.count({}).exec()
        //     }
        // }
        // // 整理数据源 -> Ant Design Pro
        // let data = res.map((e, i) => {
        //     const jsonObject = Object.assign({}, e._doc)
        //     jsonObject.key = i
        //     jsonObject.password = 'Are you ok?'
        //     jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
        //     return jsonObject
        // })

        return await this.ctx.model.Accounting.Type.find({}).sort({ id: 1 }).exec()
    }

    //批量删 payload []
    // async removes(payload) {
    //   return this.ctx.model.Type.remove({ _id: { $in: payload } })
    // }

    // Commons======================================================================================================>


    async find(id) {
        return this.ctx.model.Accounting.Type.findById(id)
    }

    async findByIdAndUpdate(id, values) {
        return this.ctx.model.Accounting.Type.findByIdAndUpdate(id, values)
    }

}

module.exports = TypeService;