const express = require('express')
const router = express.Router()

const {
    login,
    logout,
    profile,
    register    
} = require('../controllers/auth')

const { protect, authorize } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, profile)
router.patch('/logout', protect, logout)

module.exports = router