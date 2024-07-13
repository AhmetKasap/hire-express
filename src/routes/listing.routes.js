const express = require('express')
const router = express.Router()

const authMiddlewares = require('../middlewares/auth.middlewares')

const {
    addListing, 
    editListing, 
    deleteListing,
    getAllListing,
    getListingById,
    getListinfByFilter
} = require('../controllers/listing.controller')


router.post('/', authMiddlewares.checkToken, addListing)



module.exports = router