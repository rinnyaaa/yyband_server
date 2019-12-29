module.exports = app => {
    const mongoose = app.mongoose
    
    const IdsSchema = new mongoose.Schema({
      type_id: Number,
      record_id: Number,

    })
    const Ids = mongoose.model('Ids', IdsSchema)

    Ids.findOne((err, data) => {
        if (!data) {
            const newIds = new Ids({
                type_id: 0,
                record_id: 0,
            });
            newIds.save();
        }
    })

    return Ids
  }

  