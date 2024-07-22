const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createPayment, callbackController
} = require('../controllers/payment.controller')

router.get('/',  createPayment)
router.post('/callback', callbackController)

module.exports = router