const User = require('../models/User')
const { hashPass } = require('../utils/hash')
const { json } = require('body-parser')
require('dotenv').config({path: '../config/.env'})

exports.createUser = async (req, res) => {
    const { name, username, password, role } = req.body
    try {
        const user = await new User({
            name, username, role,
            password: await hashPass(password),            
        }).save()
        res.json({ user })
    } catch (error) {
        res.json(500, {error})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.json(200, { user })
    } catch (error) {
        res.json(500, {error})
    }
}

exports.getDetailUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.json(200, user)
    } catch (error) {
        res.json(500, error)
    }
}

exports.updateUser = async (req, res) => {
    const { name, username, role } = req.body
    try {
        const user = await User.updateOne({ _id: req.params.id }, {
            name, username, role
        })
        res.json(200, user)
    } catch (error) {
        res.json(500, {error})
    }
}

exports.resetPassword = async (req, res) => {
    const { username, password } = req.body    
    await User.findOne({ username }, async (err, doc) => {
        if(err) res.json(500, err)
        if (doc == null) res.json(401)                
        try {
            const user = await User.updateOne({ _id: doc._id }, {
                password: await hashPass(password)
            })
            res.json(200, user)
        } catch (err) {
            res.json(500, {err})
        }
    })    
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id })
        res.json(200, user)
    } catch (err) {
        res.json(500, err)
    }
}