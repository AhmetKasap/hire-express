const userModel = require('../models/user.model')
const evaluationModel = require('../models/evaluation.model')
const hostModel = require('../models/host.model')
const reservationModel = require('../models/reservation.model')
const Response = require('../utils/Response')
const APIError = require('../utils/Error')


const getEvaluationController = async(req,res) => {
    const hostId = req.params.id
    const evaluation = await evaluationModel.findOne({hostRef : hostId})
    if(!evaluation) return new Response(null, "not found evaluation").notfound(res)
    else return new Response(evaluation, "found evaluation").ok(res)
}


const createEvaluationController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if(!user) throw new APIError('user not found', 404)
    
    //hangi rezervasyonu puanlamak istiyorsun ve bu rezervasyonu yaptın mı ?

    const reservationId = req.body.reservationId
    const reservation = await reservationModel.findOne({_id : reservationId, userRef : user._id})
    if(!reservation) throw new APIError('error', 401)

    const evaluationControl = await evaluationModel.findOne({hostRef:reservation.hostRef, userRef : user._id})
    if(evaluationControl !== null) throw new APIError('you have already evaluated',409)
    
    const evaluation = new evaluationModel({
        userRef : user._id,
        hostRef : reservation.hostRef,
        evaluation : req.body.evaluation,
        score : req.body.score
    })
    const result = await evaluation.save()
    if (result) return new Response(result, "evaluation received").ok(res)

}

const deleteEvaluationController = async(req,res) => {
    const user = await userModel.findById(req.authUser._id)
    if(!user) throw new APIError('user not found', 404)
    
    const evaluationId = req.params.id

    const deletedEvaluation = await evaluationModel.deleteOne({_id : evaluationId, userRef : user._id} )
    if(deletedEvaluation.deletedCount ===1) return new Response(null, 'evaluation deleted')
    else throw new APIError('not found evaluation', 404)
    
}

const editEvaluationController = async (req,res) => {
    

}



module.exports = {
    getEvaluationController,
    createEvaluationController,
    deleteEvaluationController,
    editEvaluationController
}