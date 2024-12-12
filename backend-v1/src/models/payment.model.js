const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hostRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Host', required: true },
    cardName : {type : String, required : true},
    cardNumber : {type : String, required : true},
    cardCvv : {type : String, required : true},
    cardDate : {type : String, requried : true}

})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment