import mongoose from 'mongoose';
import 'dotenv/config';

const mongoDbConnection = () => {
    const connectionUrl = process.env.MONGODB_CONNECTIOIN_URL;
    
    if (!connectionUrl) {
        console.error("MONGODB_CONNECTIOIN_URL is not defined in the environment variables")
        return
    }
    
    mongoose.connect(connectionUrl)
        .then(() => console.log("Database Connection Successful"))
        .catch(err => console.error("Database Connection Error:", err))
}

export { mongoDbConnection }
