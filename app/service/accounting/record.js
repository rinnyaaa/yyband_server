'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
    // create======================================================================================================>
    async create(payload) {
        const { ctx, service } = this
        return ctx.model.Accounting.Record.create(payload)
    }

    async showRecent(accountId, count) {
        const { ctx, service } = this
        const account = await ctx.model.Accounting.Account.findById(accountId).populate({ path: 'records', options: { sort: { 'time': -1 } } })
        if (!account.records) return []
        const records = account.records.slice(0, Number(count))
        let recordsWrap = []
        let totalOut = 0
        let totalIn = 0
        records.map((recordItem) => {
            const time = ctx.helper.formatTime(recordItem.time)
            const day = time.split(" ")[0]
            recordsWrap.push({ recordItem, time,timeYear:day.split("-")[0],timeMonth:day.split("-")[1],timeDay:day.split("-")[2] })
            // recordsWrap.push({ recordItem, time})
            const month = new Date().getMonth()
            if (recordItem.time.getMonth() === month) {
                if (recordItem.isOut)
                    totalOut += recordItem.consumption
                else totalIn += recordItem.consumption
            }
        })

        return { records: recordsWrap, totalOut, totalIn }
    }

    async recordsByMonth(accountId) {
        const { ctx, service } = this
        const account = await ctx.model.Accounting.Account.findById(accountId).populate({ path: 'records', options: { sort: { 'time': -1 } } })
        if (!account.records) return []
        const records = account.records
        let newArr = [];
        let recordsWrap = []

        records.map((recordItem) => {
            const time = ctx.helper.formatTime(recordItem.time)
            const day = time.split(" ")[0]
            recordsWrap.push({ recordItem, time,timeYear:day.split("-")[0],timeMonth:day.split("-")[1],timeDay:day.split("-")[2] })
        })

        recordsWrap.forEach((item,i)=>{
            let index = -1;
            let isExists = newArr.some((newItem,j)=>{
              if(item.timeMonth==newItem.timeMonth&&item.timeYear===newItem.timeYear){
                index = j;
                return true;
              }
            })
            if(!isExists){
              newArr.push({
                time:item.time,
                // timeDay:item.timeDay,
                timeMonth:item.timeMonth,
                timeYear:item.timeYear,
                subList:[item]
              })
            }else{
              newArr[index].subList.push(item);
            }
      })
      return newArr
    }
// destroy======================================================================================================>  
// async destroy(_id) {
//     const { ctx, service } = this
//     const account = await ctx.service.account.find(_id)
//     if (!account) {
//         ctx.throw(404, '账本不存在')
//     }
//     return ctx.model.Accounting.Record.findByIdAndRemove(_id)
// }

// update======================================================================================================>
// async update(_id, payload) {
//     const { ctx, service } = this
//     const account = await ctx.service.accounting.account.find(_id)
//     if (!account) {
//         ctx.throw(404, '账本不存在')
//     }
//     return ctx.model.Accounting.Record.findByIdAndUpdate(_id, payload)
// }


// show======================================================================================================>
// async show(_id) {
//     const account = await this.ctx.service.accounting.account.find(_id)
//     if (!account) {
//         this.ctx.throw(404, '账本不存在')
//     }
//     return this.ctx.model.Accounting.Record.findById(_id)
// }

// index======================================================================================================>
// async index(payload) {
//   const { currentPage, pageSize, isPaging, search } = payload
//   let res = []
//   let count = 0
//   let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
//   if (isPaging) {
//     if (search) {
//       res = await this.ctx.model.Record.find({ email: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
//       count = res.length
//     } else {
//       res = await this.ctx.model.Record.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
//       count = await this.ctx.model.Record.count({}).exec()
//     }
//   } else {
//     if (search) {
//       res = await this.ctx.model.Record.find({ email: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
//       count = res.length
//     } else {
//       res = await this.ctx.model.Record.find({}).populate('role').sort({ createdAt: -1 }).exec()
//       count = await this.ctx.model.Record.count({}).exec()
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
//   return this.ctx.model.Record.remove({ _id: { $in: payload } })
// }

// Commons======================================================================================================>


async find(id) {
    return this.ctx.model.Accounting.Record.findById(id)
}

async findByIdAndUpdate(id, values) {
    return this.ctx.model.Accounting.Record.findByIdAndUpdate(id, values)
}

}

module.exports = RecordService;