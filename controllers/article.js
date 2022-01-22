const Article = require('../models/Article')
const Category = require('../models/Category')
const User = require('../models/User')
const multer = require('multer')
const { hashName } = require('../utils/hash')
const { compareSync } = require('bcrypt')

exports.show = async (req, res) => {
    try {
        const article = await Article.find()
        res.json(article)
    } catch (err) {
        res.json(500, err)
    }
}

exports.detail = async (req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.id })
            .populate('user', 'name')
            .populate('category', 'name')
            .populate([{
                path: 'comment',
                select: 'content',
                populate: {
                    path: 'user',
                    select: 'name'
                }
            }])
        res.json(article)
    } catch (err) {
        res.json(500, err)
    }
}

exports.uploadImage = multer({    
    storage: multer.diskStorage({
        destination: (req, file, cb) => {            
            cb(null, './upload')            
        },
        filename: async (req, file, cb) => {            
            let fileName = file.originalname.split('.')            
            let extension = fileName[fileName.length - 1]
            fileName.pop()
            fileName = hashName(fileName.join()) + '.' + extension
            cb(null, fileName)            
        }
    })    
}).single('image')

exports.create = async (req, res) => {    
    const { title, content, category } = req.body
    let image = null
    if (req.file) {
        image = req.file.filename        
    }    
    try {
        const article = await new Article({ title, content, category, user: req.id, image }).save()        
        await User.findByIdAndUpdate(req.id, {
            $push: {article: article._id}
        })
        await Category.findByIdAndUpdate(category, {
            $push: {article: article._id}
        })
        res.json(article)
    } catch (err) {
        res.json(500, err)
    }
}

exports.update = async (req, res) => {
    const { title, content, category } = req.body
    try {
        Article.findById(req.params.id, async (err, item) => {
            if (err) res.json(500, err)            
            await Category.findByIdAndUpdate(item.category, {
                $pull: {article: req.params.id}
            })                        
        })
        const article = await Article.updateOne({ _id: req.params.id }, { title, content, category })        
        await Category.findByIdAndUpdate(category, {
            $push: {article: req.params.id}
        })
        res.json(article)
    } catch (err) {
        res.json(500, err)
    }
}

exports.destroy = async (req, res) => {
    try {
        Article.findById(req.params.id, async (err, item) => {
            if (err) res.json(500, err)            
            await Category.findByIdAndUpdate(item.category, {
                $pull: {article: req.params.id}
            })        
            await User.findByIdAndUpdate(item.user, {
                $pull: {article: req.params.id}
            }) 
        })        
        const article = await Article.deleteOne({ _id: req.params.id })                        
        res.json(article)
    } catch (err) {
        res.json(500, err)
    }
}