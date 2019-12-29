module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true,required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
  })

  return mongoose.model('User', UserSchema)
}
