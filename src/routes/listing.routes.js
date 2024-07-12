const express = require('express')
const router = express.Router()

const {
    addListing, 
    editListing, 
    deleteListing,
    getAllListing,
    getListingById,
    getListinfByFilter
} = require('../controllers/listing.controller')


module.exports = router