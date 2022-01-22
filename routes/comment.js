const express = require('express')
const router = express.Router()

const {
    show,    
    create,
    update,
    destroy
} = require('../controllers/comment')
const { protect } = require('../middleware/auth')

router.route('/')
    .get(show)
    .post(protect, create)

router.route('/:id')    
    .patch(protect, update)
    .delete(protect, destroy)

module.exports = router