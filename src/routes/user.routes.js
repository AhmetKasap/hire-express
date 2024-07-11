const express = require('express')
const router = express.Router()

const {uploadAvatar, uploadImages} = require('../controllers/user.controller')

router.post('/avatar', uploadAvatar)
router.post('/images', uploadImages)



module.exports = router