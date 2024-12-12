import jwt from "jsonwebtoken";
import "dotenv/config";

import APIResponse from "../shared/utils/APIResponse";
import APIError from "../shared/utils/APIError";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../api/models/user.model";

const generateToken = async (user: any) => {
    const payload = {
        email: user.email,
    }
    const token = await jwt.sign({payload}, process.env.JWT_SECRET!, {expiresIn : process.env.JWT_EXPIRES_IN, algorithm:"HS512"})

    if(token) return token
    else throw new APIError("An error occurred while creating the token", 500)
}


const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

    if(!bearerToken) return new APIResponse("Token not found, please log in.", null).unauthorized(res)

    const token = req.headers.authorization!.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
        };

        const userInfo = await UserModel.findOne({ email: decoded.email });

        if (!userInfo) throw new APIError("User not found in the database", 404);


        res.locals.authUser = userInfo;
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return new APIResponse(null, "Token expired, please log in again.").unauthorized(res);
        } else {
            throw new APIError("Invalid token", 401);
        }
    }
};

export { generateToken, checkToken };
