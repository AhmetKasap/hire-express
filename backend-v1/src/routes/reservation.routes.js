const express = require('express')
const router = express.Router()
const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    createResarvationController,
    validationReservationController,
    reservationConfirmationController,
    getReservationController,
    getByIdReservationController,
    cancelReservationController
} = require('../controllers/reservation.controller')

router.get('/confirmation', authMiddlewares.checkToken, reservationConfirmationController)
router.get('/validate/:id', validationReservationController)
router.post('/:id', authMiddlewares.checkToken, createResarvationController)
router.get('/:id', authMiddlewares.checkToken, getByIdReservationController)
router.get('/', authMiddlewares.checkToken, getReservationController)
router.get('/cancel/:id', authMiddlewares.checkToken, cancelReservationController)

module.exports = router
