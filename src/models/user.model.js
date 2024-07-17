const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type:String, trim:true, required:true},
    lastname : {type : String, trim : true, required : true},
    email : {type : String, trim : true, required : true, unique : true},
    password : {type : String, trim : true, required : true},
    avatar : {type : String, default:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"},
    location : {type : String, trim : true},
    language : {type : [String], trim : true},
    school : {type : String, trim : true},
    work : {type : String, trim : true},
    about : {type : String, trim : true},
    favorites : {type : [mongoose.Schema.Types.ObjectId]},
    verificationAccount : {
        verifiedAccount : {type : Boolean},
        verificationCode : {type : String}
    },
    reset : {
        code : {type : String, default : null},
        time : {type : Date, default : null}
    },
    accountClosure : {
        code : {type : String, default : null},
        time : {type : Date, default : null}
    }
    
})

const users = mongoose.model('USERS', userSchema)
module.exports = users

