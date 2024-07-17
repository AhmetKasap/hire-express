const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createResarvationController
} = require('../controllers/reservation.controller')

router.post('/:id', authMiddlewares.checkToken, createResarvationController)


module.exports = router
