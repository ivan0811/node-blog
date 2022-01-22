const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { hashPass, comparePass } = require('../utils/hash')
const { json } = require('body-parser')
require('dotenv').config({path: '../config/.env'})

// exports.getToken = async (req, res) => {
//     res.status(200).json({
//         token: await readToken
//     })
// }

// exports.getUsers = async (req, res) => {    
//     res.status(200).json({ user: await users().then((res) => res[0]).catch(err => console.error(err)) })    
// }

exports.profile = async (req, res) => {    
    try {
        const getUser = await User.findOne({ _id: req.id })
        res.json(200, {user: getUser})
    } catch (error) {
        res.json(500, {error})
    }
}

exports.login = async (req, res) => {    
    const { username, password } = req.body
    
    try {
        const user = await User.findOne({ username })            

        if (user == null) {
            res.status(401).json({message: `Username ${username} tidak ditemukan!`})
        }

        let statusPass = await comparePass(password, user.password)        

        if (user != null) {                
            if (statusPass) {
                let access_token = user.token                
                if (access_token !== "") {
                    res.json(200, {access_token})
                } else {
                    access_token = jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET_KEY)
                    res.json(200, { access_token })
                    user.token = access_token
                    user.save()
                }                   
            } else {
                res.json(401, {message: `Password salah`})
            }
        }        
    } catch (error) {
        res.json(500, {error})
    }
    
    // bcrypt.compare(password, user.password, async (err, result) => {
    //     if (err) return res.sendStatus(402)        
    //     if (user.username === username && result) {
    //         const accessToken = jwt.sign(user._id, process.env.ACCESS_TOKEN_SECRET)            
    //         const status = await saveToken(accessToken)
    //         if(status) res.status(200).json({ accessToken })
    //     } else {
    //         res.sendStatus(401)    
    //     }
    // })        
}

exports.logout = async (req, res) => {      
    try {
        await User.updateOne({ _id: req.id }, { token: "" })
        res.json(200, 'Logout Berhasil')
    } catch (err) {
        res.json(500, {err})
    }
}

exports.register = async (req, res) => {        
    const { name, username, password } = req.body
    try {        
        const user = await new User({
            name, username,
            password: await hashPass(password)            
        }).save()
        user.token = jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET_KEY)
        user.save()
        res.json({ user })
    } catch (error) {
        res.json(500, {error})
    }
}

