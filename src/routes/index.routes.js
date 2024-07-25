const express = require('express')
const router = express.Router()


const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const hostRoutes = require('./host.routes')
const accountRoutes = require('./account.routes')
const reservationRoutes = require('./reservation.routes')
const paymentRoutes = require('./payment.routes')
const supportRoutes = require('./support.routes')
const evaluationRoutes = require('./evaluation.routes')

router.use('/auth',authRoutes)
router.use('/users', userRoutes)
router.use('/host', hostRoutes)
router.use('/account', accountRoutes)
router.use('/reservation', reservationRoutes)
router.use('/payment', paymentRoutes)
router.use('/support', supportRoutes)
router.use('/evaluation', evaluationRoutes)



module.exports = router