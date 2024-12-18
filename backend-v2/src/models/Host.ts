import mongoose from "mongoose"


const hostSchema = new mongoose.Schema({
    location: {
        country: { type: String, trim: true, required : true},
        city: { type: String, trim: true, required : true},
        state: { type: String, trim: true, required : true }
    },

    hostType : {type : String, required : true},
    numberOfGuests : {type : Number, required: true},
    price : {type : Number, required : true},
    explanation : {type : String, required : true},
    images : {type : [String], required : true},
    status: { type: String, enum: ['active', 'passive'], default: 'passive' },

    userRef : {type : mongoose.Schema.Types.ObjectId, ref : 'Users'}
    
})


export const HostModel = mongoose.model("Hosts", hostSchema)