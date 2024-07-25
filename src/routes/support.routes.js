const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')
const {
    createSupportController,
    getSupportController,
    deleteSupportController
} = require('../controllers/support.controller')

router.post('/', authMiddlewares.checkToken, createSupportController)
router.get('/', authMiddlewares.checkToken, getSupportController)
router.delete('/:id', authMiddlewares.checkToken, deleteSupportController)


module.exports = router