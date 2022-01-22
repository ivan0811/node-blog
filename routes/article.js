const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const upload = multer({dest: 'uploads/'})

const {
    show,
    detail,
    create,
    update,
    destroy,
    uploadImage
} = require('../controllers/article')

const { protect } = require('../middleware/auth')

router.route('/')
    .get(show)
.post(protect, uploadImage, create)

router.route('/:id')
    .get(detail)
    .patch(protect, update)
    .delete(protect, destroy)

module.exports = router