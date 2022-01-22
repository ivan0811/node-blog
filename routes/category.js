const express = require('express')
const router = express.Router()

const {
    show,
    detail,
    create,
    update,
    destroy
} = require('../controllers/category')
const { protect, authorize } = require('../middleware/auth')

router.route('/')
    .get(protect, authorize('admin'), show)
    .post(protect, authorize('admin'), create)

router.route('/:id')
    .get(protect, authorize('admin'), detail)
    .patch(protect, authorize('admin'), update)
    .delete(protect, authorize('admin'), destroy)

module.exports = router