const express = require('express')
const router = express.Router()

const {
    resetPassword,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getDetailUser
} = require('../controllers/user')

const { protect, authorize } = require('../middleware/auth')

router.patch('/reset-password', protect, resetPassword)
router.route('/')
    .get(protect, authorize('admin'), getUser)
    .post(protect, authorize('admin'), createUser)

router.route('/:id')
    .get(protect, authorize('admin'), getDetailUser)
    .patch(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser)

module.exports = router