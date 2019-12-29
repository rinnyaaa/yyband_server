'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
    // create======================================================================================================>
    async create(payload) {
        const { ctx, service } = this
        return ctx.model.Accounting.Account.create(payload)
    }

    // destroy======================================================================================================>  
    async destroy(_id) {
        const { ctx, service } = this
        const account = await ctx.service.account.find(_id)
        if (!account) {
            ctx.throw(404, '账本不存在')
        }
        return ctx.model.Accounting.Account.findByIdAndRemove(_id)
    }

    // update======================================================================================================>
    async update(_id, payload) {
        const { ctx, service } = this
        const account = await ctx.service.accounting.account.find(_id)
        if (!account) {
            ctx.throw(404, '账本不存在')
        }
        return ctx.model.Accounting.Account.findByIdAndUpdate(_id, payload)
    }

    // show======================================================================================================>
    async show(_id) {
        const account = await this.ctx.service.accounting.account.find(_id)
        if (!account) {
            this.ctx.throw(404, '账本不存在')
        }
        const records = await this.service.accounting.record.showRecent(_id, 9999)
        const { totalOut, totalIn } = records
        // const account = await this.ctx.model.Accounting.Account.findById(_id).populate('record')
        const res = { account, totalOut, totalIn }
        return res
    }

    async addRecord(_id, record) {
            const { ctx, service } = this
            const account = await ctx.service.accounting.account.find(_id)
            if (!account) {
                ctx.throw(404, '账本不存在')
            }
            account.records.push(record);
            return ctx.model.Accounting.Account.findByIdAndUpdate(_id, { $set: { records: account.records } })
        }
        // index======================================================================================================>
        // async index(payload) {
        //   const { currentPage, pageSize, isPaging, search } = payload
        //   let res = []
        //   let count = 0
        //   let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
        //   if (isPaging) {
        //     if (search) {
        //       res = await this.ctx.model.Account.find({ email: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        //       count = res.length
        //     } else {
        //       res = await this.ctx.model.Account.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        //       count = await this.ctx.model.Account.count({}).exec()
        //     }
        //   } else {
        //     if (search) {
        //       res = await this.ctx.model.Account.find({ email: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        //       count = res.length
        //     } else {
        //       res = await this.ctx.model.Account.find({}).populate('role').sort({ createdAt: -1 }).exec()
        //       count = await this.ctx.model.Account.count({}).exec()
        //     }
        //   }
        //   // 整理数据源 -> Ant Design Pro
        //   let data = res.map((e, i) => {
        //     const jsonObject = Object.assign({}, e._doc)
        //     jsonObject.key = i
        //     jsonObject.password = 'Are you ok?'
        //     jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
        //     return jsonObject
        //   })

    //   return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
    // }

    //批量删 payload []
    // async removes(payload) {
    //   return this.ctx.model.Account.remove({ _id: { $in: payload } })
    // }

    // Commons======================================================================================================>


    async find(id) {
        return this.ctx.model.Accounting.Account.findById(id)
    }

    async findByIdAndUpdate(id, values) {
        return this.ctx.model.Accounting.Account.findByIdAndUpdate(id, values)
    }

}

module.exports = AccountService;