const hostModel = require('../models/host.model')
const userModel = require('../models/user.model')
const Response = require('../utils/Response')
const upload = require('../middlewares/lib/multer')
const multer = require("multer")
const APIError = require('../utils/Error')



const addHost = async(req,res) => { 
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)

    upload.images(req,res, async function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            const data = JSON.parse(req.body.data)
            const host = new hostModel({
                location : data.location,
                hostType : data.hostType,
                numberOfGuests : data.numberOfGuests,
                price : data.price,
                explanation : data.explanation,
                images : req.savedImages,
                userRef : user._id
            })
            await host.save()

            return new Response(host, "registration was successfully created").created(res)
        }
    })

}

const editHost = async(req,res) => {
   

}

const deleteHost = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)
    
    const listing = await hostModel.findById(req.params.id)
    if(!listing) return new Response(null, 'no record listing found').notfound(res)
    
    const deletedHost = await hostModel.findByIdAndDelete(listing._id)
    if(deletedHost) return new Response(null, 'deleted host').ok(res)
    
}


const getHostById = async(req,res) => {
    const host = await hostModel.findById(req.params.id)
    if(!host) return new Response(null, 'no record listing found').notfound(res)
    else return new Response(host, 'found host').ok(res)
}

const getHostByFilter = async(req,res) => { 
    console.log(req.query)

}

const getAllHost = async(req,res) => {
    const allHost = await hostModel.find()
    if (allHost) return new Response(allHost, 'all host').ok(res)
}

const getPopularHost = async(req,res) => {

}



module.exports = {
    addHost,
    editHost,
    deleteHost,
    getHostById,
    getHostByFilter,
    getAllHost,
    getPopularHost
}


