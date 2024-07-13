const listingModel = require('../models/listing.model')
const userModel = require('../models/user.model')
const Response = require('../utils/Response')
const upload = require('../middlewares/lib/multer')
const multer = require("multer")



const addListing = async(req,res) => { //users can share their house
    
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)

    console.log(req.body.data)
    console.log(req.body)
    

    
    
   /*
    const listingInfo = JSON.parse(req.body.data)
    console.log(listingInfo)

    console.log(req.body.images)

    upload.images(req,res, function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {

            return new Response(req.savedImages, "Images successfully added.").created(res)
        }
    })
    
   */
    


    
    

}

const editListing = async(req,res) => {

}

const deleteListing = async(req,res) => {

}

const getAllListing = async(req,res) => {

}

const getListingById = async(req,res) => {

}

const getListinfByFilter = async(req,res) => {

}


module.exports = {
    addListing,editListing,
    deleteListing,getAllListing,
    getListingById,getListinfByFilter
}


