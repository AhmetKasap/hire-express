
import jwt from "jsonwebtoken";
import "dotenv/config";

import APIError from "../utils/APIError";


const generateToken = async (email: string) => {
    console.log(email)
    const payload = {
        email
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn : process.env.JWT_EXPIRES_IN, algorithm:"HS512"})

    if(token) return token
    else throw new APIError("An error occurred while creating the token", 500)
}


export {generateToken}