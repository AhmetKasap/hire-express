import { UserModel } from "../models/User"
import APIError from "../shared/utils/APIError"

import { generateToken } from "../shared/helpers/generate.token"
import bcrypt from "bcrypt"


export class AuthService {

    public async register(firstName : string, lastName : string, email : string, password : string) : Promise<object> {

        const isUserAvailable = await UserModel.findOne({email : email})
        if(isUserAvailable) throw new APIError("user already registered",409)

        const hashPassword = await bcrypt.hash(password,10)
        
        const createNewUser = await UserModel.create({firstName,lastName,email, password : hashPassword})
        return createNewUser

    }


    public async login(email : string, password : string) : Promise<string> {

        const user = await UserModel.findOne({email : email})

        if(!user) throw new APIError('user not found', 404)

        const storedPassword = user.password as string

        const isPasswordValid  = await bcrypt.compare(password, storedPassword)

        if(user && isPasswordValid) {
            const token = await generateToken(email)
            return token
        } else throw new APIError("Invalid credentials", 401)

    }


    
}