const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message : {type : String, required : true},

},{timestamps : true})


const supportModel = mongoose.model('Support', supportSchema)
module.exports = supportModel