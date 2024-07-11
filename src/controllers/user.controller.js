const multer = require("multer")
const upload = require("../middlewares/lib/multer")
const APIError = require("../utils/Error")
const Response = require("../utils/Response")


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
    uploadAvatar,uploadImages
}