module.exports = app => {
    const mongoose = app.mongoose
    const RecordSchema = new mongoose.Schema({
            // id: { type: Number },
            isOut: { type: Boolean, required: true }, //收支模式
            consumption: { type: Number, required: true }, //支出或收入金额
            remarks: { type: String },
            time: { type: Date, default: Date.now },
            _account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
            _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

            typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
        })
        // RecordSchema.index({ id: 1 })
    return mongoose.model('Record', RecordSchema)
}