const mongoose = require('mongoose')

const schema = mongoose.Schema({
    image: {
        type: String,
        default: 'no-image.jpg'
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,        
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'        
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'        
    },
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Article', schema)