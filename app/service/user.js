const Service = require('egg').Service


class UserService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this
    /////////////////////
    //todo 权限分配
    // if (!payload.role) {
    //   if (!payload.type||payload.type === 'user') {
    //     payload.role = '5def608fbc42de9b2eb948d0';
    //   } else if (payload.type === 'admin') {
    //     payload.role = '5def60a1b42b099b4067f937';
    //   }
    // }
    // if (!payload.type) {
    //   ctx.throw(404, '缺少type参数')
    // }
    // //////////////
    // const role = await service.role.findByName(payload.type)
    // if (!role) {
    //   ctx.throw(404, 'role is not found')
    // }

    const account = await service.accounting.account.create({
      accountName: '我的账本',
        budget: 0,
        wage: 0,
    })
    return ctx.model.User.create({account:account._id,...payload})
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    return ctx.model.User.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const user = await this.ctx.service.user.find(_id)
    if (!user) {
      this.ctx.throw(404, '用户不存在')
    }
    return this.ctx.model.User.findById(_id).populate('role')
  }

  // index======================================================================================================>
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.User.find({ email: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    } else {
      if (search) {
        res = await this.ctx.model.User.find({ email: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'Are you ok?'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }


  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } })
  }

  // Commons======================================================================================================>
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile: mobile })
  }

  async findByEmail(email) {
    return this.ctx.model.User.findOne({ email: email })
  }

  async find(id) {
    return this.ctx.model.User.findById(id)
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }



}


module.exports = UserService