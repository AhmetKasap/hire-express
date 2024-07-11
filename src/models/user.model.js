const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
    verificationAccount : {
        verifiedAccount : {type : Boolean},
        verificationCode : {type : String}
    },
    reset : {
        code : {type : String, default : null},
        time : {type : Date, default : null}
    }
    
})

const users = mongoose.model('USERS', userSchema)
module.exports = users