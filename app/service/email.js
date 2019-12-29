'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const user_email = '854250234@qq.com';
const auth_code = 'ctnwqznelcodbbej';

const transporter = nodemailer.createTransport({
    service: 'qq',
    secureConnection: false,
    port: 25,
    auth: {
        user: user_email, // 账号
        pass: auth_code, // 授权码

    },
});

class EmailService extends Service {
    async sendMail(email, subject, html) {

        const mailOptions = {
            from: user_email, // 发送者,与上面的user一致
            to: email,   // 接收者,可以同时发送多个,以逗号隔开
            subject,   // 标题
            html,
        };

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (err) {
            return false;
        }
    }


    // create======================================================================================================>
    async create(payload) {
        const { ctx, service } = this
        const user = await ctx.service.user.findByEmail(payload.email);
        if (user) ctx.throw(404, '用户已存在')
        /////////////////////
        //todo 权限分配
        // if (!payload.role) {
        //     if (!payload.type) {
        //         payload.role = '5def608fbc42de9b2eb948d0';
        //     } else if (payload.type === 'admin') {
        //         payload.role = '5def60a1b42b099b4067f937';
        //     }
        // }
        // //////////////
        // const role = await service.role.show(payload.role)
        // if (!role) {
        //     ctx.throw(404, 'role is not found')
        // }
        if (!payload.type) {
            ctx.throw(404, '缺少type参数')
          }
          //////////////
          const role = await service.role.findByName(payload.type)
          if (!role) {
            ctx.throw(404, 'role is not found')
          }
      
       
        const email = payload.email
        const subject = '亲爱的用户还是我呀'
        const code = await ctx.genHash(payload.password);
        

        const HTML = `
               <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>点击该链接完成注册</title>
                </head>
                            <body>
                                <div style="text-align:center">
                                    <p>亲爱的用户您好 欢迎您注册嘤嘤嘤行小工具</p>
                                    <p>您的注册邮箱为${email}  请点击下方链接完成注册 </p>
                                    <p></p>
                                    <a href="http://127.0.0.1:7001/api/email?code=${code}&amp;email=${email}&role=${role._id}">http://127.0.0.1:7001/api/email?code=${code}&amp;email=${email}</a>
                                    <p>如果以上链接无法点击，请将上面的地址复制到你的浏览器地址栏进入</p>
                                </div>
                            </body>
                </html>`

        const html = HTML;
        const has_send = await this.service.email.sendMail(email, subject, html);
        if (has_send) {
            return { description: '发送邮件成功', ...ctx.model.Email.create(payload) }
        } else {
            ctx.throw(404, '发送失败')
        }

        // return ctx.model.Email.create(payload)
    }

    // destroy======================================================================================================>
    async destroy(_id) {
        const { ctx, service } = this
        const email = await ctx.service.email.find(_id)
        if (!email) {
            ctx.throw(404, 'email not found')
        }
        return ctx.model.Email.findByIdAndRemove(_id)
    }

    // update======================================================================================================>
    async update(_id, payload) {
        const { ctx, service } = this
        const email = await ctx.service.email.find(_id)
        if (!email) {
            ctx.throw(404, 'email not found')
        }
        return ctx.model.Email.findByIdAndUpdate(_id, payload)
    }

    // show======================================================================================================>
    async show(_id) {
        const email = await this.ctx.service.email.find(_id)
        if (!email) {
            this.ctx.throw(404, 'email not found')
        }
        return this.ctx.model.Email.findById(_id).populate('role')
    }

    // Commons======================================================================================================>

    async findByEmail(email) {
        return this.ctx.model.Email.findOne({ email: email })
    }

    async find(id) {
        return this.ctx.model.Email.findById(id)
    }

    async findByIdAndUpdate(id, values) {
        return this.ctx.model.Email.findByIdAndUpdate(id, values)
    }

}

module.exports = EmailService;
