const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createPayment
} = require('../controllers/payment.controller')

router.post('/', authMiddlewares.checkToken, createPayment)



//! For PayTR
//router.get('/',  createPayment)
//router.post('/callback', callbackController)

module.exports = router