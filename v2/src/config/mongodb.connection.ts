import 'dotenv/config'
import mongoose from 'mongoose'

const mongoDbConnection = () => {
    mongoose.connect("mongodb://localhost:27017/layered-express")
    .then(response => console.log("Database Connection Successfull"))
    .catch(err => console.log("Database Connection Error"))
}

export {mongoDbConnection}