module.exports = app => {
    const mongoose = app.mongoose

    const TypeSchema = new mongoose.Schema({
        id: { type: Number, required: true },
        name: { type: String, required: true },
        createAt: {
            type: Number,
            default: Date.now,
        },
    })
    const Type = mongoose.model('Type', TypeSchema)

    Type.find((err, data) => {
        if (!data || data.length === 0) {
            init();
        }
    })

    Type.findById((err, data) => {
        if (!data) {
            init();
        }
    })

    function init() {
        Type.create({
            name: '外卖',
            id: 0
        });
        Type.create({
            name: '交通',
            id: 1
        });
        Type.create({
            name: '服饰',
            id: 2
        });
        Type.create({
            name: '日用品',
            id: 3
        });
        Type.create({
            name: '零食',
            id: 4
        });
        Type.create({
            name: '买菜',
            id: 5
        });
        Type.create({
            name: '话费',
            id: 6
        });
        Type.create({
            name: '氪金',
            id: 7
        });
        Type.create({
            name: '医疗',
            id: 8
        });
        Type.create({
            name: '化妆',
            id: 9
        });
    }
    return Type

}