const multer = require("multer")
const upload = require("../middlewares/lib/multer")
const APIError = require("../utils/Error")
const Response = require("../utils/Response")
const userModel = require('../models/user.model')
const hostModel = require('../models/host.model')


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
const getFavorites = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response(null, 'user not found').notfound(res)

    const favorites = await userModel.findById(user._id).select('favorites')  //* favorite control
    console.log(favorites)
    if(favorites.favorites.length === 0 ) return new Response(null, 'users favorites list is empty').badRequest(res)

    const host = await hostModel.find( {_id : {$in : favorites.favorites}} ).select('location hostType numberOfGuests price images') //* list favorites
    return new Response(host, 'users favorites').ok(res)
}

const addFavorites = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response(null, 'user not found').notfound(res)

    const hostId = req.params.id //* host id

    const host = await hostModel.findOne({_id : hostId}) //* host control
    if(!host) return new Response(null, 'host not found').notfound(res)

    let hostControl = await userModel.findById(user._id).select('favorites') //* daha önce favorilere eklenmiş ise tekrar ekleme
    hostControl = hostControl.favorites
    if(hostControl.includes(host._id)) throw new APIError('a place already added to favorites.', 400)
    
    user.favorites.push(host._id) //* favorilere ekle.
    await user.save()
    .then(data => {
        return new Response(null, 'added favorites').ok(res)
    }).catch(err => {
        throw new APIError('error! an error occurred while adding to favorites', 500)
    })
}

const deleteFavorites = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response(null, 'user not found').notfound(res)

    let favorites = await userModel.findById(user._id).select('favorites')
    favorites = favorites.favorites
    if(favorites.length === 0) throw new APIError('favorite place not found to delete', 404)

    const hostId = req.params.id //* silinecek mekanı çıkartarak yeni dizi oluşturduk
   
    const newFavorites = favorites.filter(data => data.toString() !== hostId)
    console.log('newFavoritessssssssssss', newFavorites)

    user.favorites = newFavorites //* favorites'i yeni diziyle güncelledik.
    await user.save()
    .then(data => {return new Response(null, 'deletion successfull').ok(res)})
    .catch(err => {throw new APIError('error occurred during deletion', 500)})

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
    uploadAvatar,
    uploadImages,
    getProfile,
    editProfile,
    getAvatar,
    updateAvatar,
    getFavorites,
    addFavorites,
    deleteFavorites
}