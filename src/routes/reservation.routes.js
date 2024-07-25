const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createResarvationController,
    validationReservationController,
    reservationConfirmationController
} = require('../controllers/reservation.controller')

router.get('/confirmation', authMiddlewares.checkToken, reservationConfirmationController)
router.get('/:id', validationReservationController)
router.post('/:id', authMiddlewares.checkToken, createResarvationController)



module.exports = router
