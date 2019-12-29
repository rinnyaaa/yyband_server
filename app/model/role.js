module.exports = app => {
  const mongoose = app.mongoose

  const RoleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    access: { type: String, required: true, default: 'user' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  const Role = mongoose.model('Role', RoleSchema)
  Role.findOne((err, data) => {
    if (!data) {
      Role.create({
        name: 'admin',
        access: 'admin',
      });
      Role.create({
        name: 'user',
        access: 'user',
      });
    }
  })
  return Role
}