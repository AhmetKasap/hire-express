const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    location : {type : String, required : true},
    hostType : {type : String, required : true},
    numberOfGuests : {type : Number, required: true},
    price : {type : Number, required : true},
    explanation : {type : String, required : true},
    images : {type : [String], required : true},

    userRef : {type : mongoose.Schema.Types.ObjectId, ref : 'User'} //reference from user

})

const Listing = mongoose.model('listing', listingSchema)
module.exports = Listing