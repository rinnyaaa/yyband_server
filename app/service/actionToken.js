'use strict'

const Service = require('egg').Service

class ActionTokenService extends Service {
    async apply(_id, account) {
        const { ctx } = this
        return ctx.app.jwt.sign({
            data: {
                _id: _id,
                account
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, ctx.app.config.jwt.secret)
    }
}

module.exports = ActionTokenService