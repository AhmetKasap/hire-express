const userModel = require('../models/user.model')
const supportModel = require('../models/support.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')


const createSupportController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)

    if(!user) throw new APIError('user not found', 404)
    
    const support = new supportModel({
        userRef : user._id,
        message : req.body.message
    })

    const response = await support.save()
    if(response) return new Response(null, "request for support received").created(res)
    else throw new APIError('an error occurred', 500)

}


const getSupportController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if(!user) throw new APIError('user not found', 404)

    const support = await supportModel.find({userRef : user._id} )
    if(support.length <= 0) return new Response(null, "support request not found").badRequest(res)
    else return new Response(support, "requests for support found").ok(res)

}

const deleteSupportController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if(!user) throw new APIError('user not found', 404)

    const checkId = await supportModel.findById(req.params.id)
    if(!checkId._id) throw new APIError('not found support id', 404)
    
    const support = await supportModel.deleteOne({userRef : user._id, _id : req.params.id} )
    if(support.acknowledged===true) return new Response(null, 'delete successfull').ok(res)
    else throw new APIError('an error occured', 500)

}


module.exports = {
    createSupportController,
    getSupportController,
    deleteSupportController
}