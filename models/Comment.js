const { text } = require('body-parser')
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Comment', schema)