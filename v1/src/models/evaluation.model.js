const mongoose = require('mongoose')

const evaluationSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hostRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
    evaluation: {type : String, required : true},
    score : {type : Number, required : true},
})

const Evaluation = mongoose.model('Evaluation', evaluationSchema)

module.exports = Evaluation