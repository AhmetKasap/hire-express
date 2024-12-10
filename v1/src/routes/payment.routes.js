const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createPaymentController
} = require('../controllers/payment.controller')

router.post('/', authMiddlewares.checkToken, createPaymentController)



//! For PayTR
//router.get('/',  createPayment)
//router.post('/callback', callbackController)

module.exports = router