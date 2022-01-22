const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    article: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
})

module.exports = mongoose.model('Category', schema)