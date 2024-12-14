import jwt from "jsonwebtoken";
import "dotenv/config";

import APIResponse from "../shared/utils/APIResponse";
import APIError from "../shared/utils/APIError";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User";


const tokenVerifiy = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const bearerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")


    if(!bearerToken)  new APIResponse("Token not found, please log in.", null).unauthorized(res)

    const token = req.headers.authorization!.split(" ")[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
        }
        
        const userInfo = await UserModel.findOne({ email: decoded.email });

        if (!userInfo) throw new APIError("User not found in the database", 404);


        res.locals.authUser = userInfo;
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
             new APIResponse(null, "Token expired, please log in again.").unauthorized(res);
        } else {
            throw new APIError("Invalid token", 401);
        }
    }
}

export {  tokenVerifiy }