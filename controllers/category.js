const { json } = require('body-parser')
const Article = require('../models/Article')
const Category = require('../models/Category')

exports.show = async (req, res) => {
    try {
        const category = await Category.find()
        res.json(category)
    } catch (err) {
        res.json(500, err)
    }
}

exports.detail = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id }).populate('article')
        res.json(category)
    } catch (err) {
        res.json(500, err)
    }
}

exports.create = async (req, res) => {
    const { name } = req.body
    try {
        const category = await new Category({ name }).save()
        res.json(category)
    } catch (err) {
        res.json(500, err)
    }
}

exports.update = async (req, res) => {
    const { name } = req.body
    try {
        const category = await Category.updateOne({ _id: req.params.id }, { name })
        res.json(category)
    } catch (err) {
        res.json(500, err)
    }
}

exports.destroy = async (req, res) => {
    try {        
        const category = await Category.deleteOne({ _id: req.params.id })        
        res.json(category)
    } catch (err) {
        res.json(500, err)
    }
}