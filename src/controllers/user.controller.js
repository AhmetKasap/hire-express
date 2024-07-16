const multer = require("multer")
const upload = require("../middlewares/lib/multer")
const APIError = require("../utils/Error")
const Response = require("../utils/Response")
const userModel = require('../models/user.model')


//* USER PROFILE 


const getProfile = async (req,res) => {
    const user = await userModel.findById(req.params.id).select('name lastname email avatar location language school work about')

    if(!user) throw new APIError("not found user", 404)
    else return new Response(user, "user profile").ok(res)
}

const editProfile = async(req,res) => {
    const user = await userModel.findById(req.authUser._id) //check token
    const updateInfo = req.body

    if(!user) return new Response('you are not authorized for this operation')
    
    const updatedProfile = await userModel.findByIdAndUpdate(user._id, updateInfo , { new: true }).select('name lastname email avatar location language school work about')
    return new Response(updatedProfile,'updated user profile information').ok(res)

}

const getAvatar = async (req,res) => {

    const user = await userModel.findById(req.params.id)

    if(!user) return new Response(null, 'not found user').notfound(res)
    
    return new Response(user.avatar, 'user avatar').ok(res)

}

const updateAvatar = async (req,res) => {
    console.log(req.body.avatar)
    
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response(null, 'user not found').notfound(res)

    upload.avatar(req,res, async function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            const result = await userModel.findByIdAndUpdate(user._id, {$set : {'avatar' : req.savedImages}}, { new: true })
            return new Response(result, "Avatar successfully updated.").ok(res)
        }
    })
    
    

}



//* USER FAVORITES
const listFavorites = async(req,res) => {

}

const addFavorites = async(req,res) => {

}

const deleteFavorites = async(req,res) => {

}







const uploadAvatar = async(req,res) => {
    upload.avatar(req,res, function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            return new Response(req.savedImages, "Avatar successfully added.").created(res)
        }
    })
}

const uploadImages = async(req,res) => {
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
}



module.exports = {
    uploadAvatar,uploadImages,getProfile,editProfile, getAvatar, updateAvatar
}