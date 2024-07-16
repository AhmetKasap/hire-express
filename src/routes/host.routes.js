const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    addHost, 
    editHost, 
    deleteHost,
    getAllHost,
    getHostById,
    getHostByFilter
} = require('../controllers/host.controller')


router.post('/', authMiddlewares.checkToken, addHost)
router.delete('/:id', authMiddlewares.checkToken, deleteHost)
router.get('/', getAllHost)
router.get('/filter', getHostByFilter)
router.get('/:id', getHostById)

module.exports = router