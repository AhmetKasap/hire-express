const express = require('express')
const router = express.Router()


const authRoutes = require('./auth.routes')
router.use('/auth',authRoutes)

const userRoutes = require('./user.routes')
router.use('/users', userRoutes)

const hostRoutes = require('./host.routes')
router.use('/host', hostRoutes)

const accountRoutes = require('./account.routes')
router.use('/account', accountRoutes)

const reservationRoutes = require('./reservation.routes')
router.use('/reservation', reservationRoutes)


module.exports = router