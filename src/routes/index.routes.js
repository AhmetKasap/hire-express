const express = require('express')
const router = express.Router()


const authRoutes = require('./auth.routes')
router.use('/auth',authRoutes)

const userRoutes = require('./user.routes')
router.use('/users', userRoutes)

module.exports = router