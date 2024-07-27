const hostModel = require('../models/host.model')
const userModel = require('../models/user.model')
const Response = require('../utils/Response')
const upload = require('../middlewares/lib/multer')
const multer = require("multer")
const APIError = require('../utils/Error')
const elastic = require('../services/Elasticsearch/query/elastic.host.query')


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
            console.log("req.saved.images",req.savedImages)
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
            const result = await host.save()

            //* added elasticsearch
            if(result) await elastic.addHost(result)
                
            return new Response(result, "registration was successfully created").created(res)

        }
    })

}

const editHost = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if (!user) return new Response('null', 'not found user').notfound(res)

    const hostId = await hostModel.findById(req.params.id)
    if(!hostId) return new Response(null, 'not found host').notfound(res)
    
    upload.images(req,res, async function(err) {
        if (err instanceof multer.MulterError) {
            return new Response(null, "An error caused by multer.").internalServerError(res)
        }
        else if (err) {
            return new Response(null, err.message).badRequest(res)
        }
        else {
            const data = JSON.parse(req.body.data)
            const dataForUpdate = {
                ...data,
                savedImages: req.savedImages
            };
            console.log(dataForUpdate)
            await hostModel.findByIdAndUpdate(req.params.id, dataForUpdate, { new: true })
            .then(data => new Response(data, 'updated host').ok(res))
            .catch(err => new Response(err, err).internalServerError)
            
        }
    })


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
    const host = await hostModel.find({
        location: req.query.location,
        hostType: req.query.hostType,
        numberOfGuests:  req.query.numberOfGuests,
        price: { $gte: req.query.minPrice, $lte: req.query.maxPrice }
    })
    if (!host.length) return new Response(null, 'No record found as a result of filtering').ok(res)
    else return new Response(host, 'Places found as a result of filtering').ok(res)

}

const getAllHost = async(req,res) => {
    /*
    MONGODB QUERY
    const allHost = await hostModel.find()
    if (allHost) return new Response(allHost, 'all host').ok(res)

    */

    //elasticsearch query
    const allHosts = await elastic.getAllHost()
    
    if(allHosts.length<=0) return new Response(null, 'not found host').notfound(res)

    const cleanAllHosts = await allHosts.map(data => {
        return data._source
    })
    
    if(allHosts) return new Response(cleanAllHosts, 'all host').ok(res)
   
    
}

const getPopularHostForMainPage = async(req,res) => {


}





module.exports = {
    addHost,
    editHost,
    deleteHost,
    getHostById,
    getHostByFilter,
    getAllHost,
    getPopularHostForMainPage
}


