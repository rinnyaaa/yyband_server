module.exports = app => {
    const mongoose = app.mongoose
    const AccountSchema = new mongoose.Schema({
        accountName: { type: String, required: true, default: '我的账本' },
        budget: { type: Number, required: true },
        wage: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    })
    const Account = mongoose.model('Account', AccountSchema)

    return Account
}