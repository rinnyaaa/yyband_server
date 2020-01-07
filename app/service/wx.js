const Service = require('egg').Service


class WxService extends Service {
  // create======================================================================================================>
  //从code获得openId和session_key
  async create(payload) {
    const { ctx, service } = this
    const { code } = payload
    const appid = 'wx0a01fcfb12f48db8'
    const secret = '7b643d2313380f9575658720f5cc617e'
    const grant_type = 'authorization_code'
    const res = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${grant_type}`, { dataType: 'json' })

    const { session_key, openid } = res.data
    if (!openid) ctx.throw(404, '获取用户信息失败')

    const role = await service.role.findByName('user')
    if (!role) {
      ctx.throw(404, 'role is not found')
    }

    const user = await ctx.model.User.findOne({ openId: openid })
    if (!user)
    // return ctx.model.Wx.create({ account: account._id, openId: openid,password:'wx_user' })
    {
      const new_user = await service.user.create({ openId: openid, password: 'wx_user', role })
      return { token: await service.actionToken.apply(new_user._id, new_user.account) }
    } else {
      return { token: await service.actionToken.apply(user._id, user.account) }
    }
  }

}


module.exports = WxService