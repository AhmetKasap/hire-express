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

router.get('/search', getAllHost)
router.get('/filter', getHostByFilter)



router.post('/', authMiddlewares.checkToken, addHost)
router.put('/:id', authMiddlewares.checkToken, editHost)
router.delete('/:id', authMiddlewares.checkToken, deleteHost)
router.get('/:id', getHostById)



module.exports = router