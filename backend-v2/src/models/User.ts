import mongoose, { Model, Schema } from "mongoose"

const userSchema : Schema = new mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar : {type : String},

    location: {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    language : {type : [String], trim : true},
    school : {type : String, trim : true},
    work : {type : String, trim : true},
    about : {type : String, trim : true},

})

export const UserModel = mongoose.model('Users', userSchema) 
