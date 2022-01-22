const Comment = require('../models/Comment')
const Article = require('../models/Article')
const User = require('../models/User')

exports.show = async (req, res) => {
    try {
        const comment = await Comment.find().populate('user', 'name')
        res.json(comment)
    } catch (err) {
        res.json(500, err)
    }
}

exports.create = async (req, res) => {
    const { content, article } = req.body
    try {
        const comment = await new Comment({ content, article, user: req.id }).save()
        await User.findByIdAndUpdate(req.id, {
            $push: {comment: comment._id}
        })
        await Article.findByIdAndUpdate(article, {
            $push: {comment: comment._id}
        })
        res.json(comment)
    } catch (err) {
        res.json(500, err)
    }
}

exports.update = async (req, res) => {
    const { content, article } = req.body
    try {        
        const comment = await Comment.updateOne({ _id: req.params.id }, { content, article })        
        res.json(comment)
    } catch (err) {
        res.json(500, err)
    }
}

exports.destroy = async (req, res) => {
    try {
        Comment.findById(req.params.id, async (err, item) => {
            if (err) res.json(500, err)            
            await Article.findByIdAndUpdate(item.article, {
                $pull: {comment: req.params.id}
            })            
            await User.findByIdAndUpdate(item.user, {
                $pull: {comment: req.params.id}
            })            
        })    
        const comment = await Comment.deleteOne({ _id: req.params.id })                
        res.json(comment)
    } catch (err) {
        res.json(500, err)
    }
}