const express = require('express')
const router = express.Router()


const authRoutes = require('./auth.routes')
router.use('/auth',authRoutes)

const userRoutes = require('./user.routes')
router.use('/users', userRoutes)

const listingRoutes = require('./listing.routes')
router.use('/listing', listingRoutes)


module.exports = router