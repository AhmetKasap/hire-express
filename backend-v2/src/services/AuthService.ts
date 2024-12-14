import { UserModel } from "../models/User"
import APIError from "../shared/utils/APIError"

import { generateToken } from "../shared/helpers/generate.token"

export class AuthService {

    public async register(firstName : string, lastName : string, email : string, password : string) : Promise<object> {

        const isUserAvailable = await UserModel.findOne({email : email})
        if(isUserAvailable) throw new APIError("user already registered",409)
        
        const createNewUser = await UserModel.create({firstName,lastName,email,password})
        return createNewUser

    }


    public async login(email : string, password : string) : Promise<string> {

        const user = await UserModel.findOne({email : email})

        if(!user) throw new APIError('user not found', 404)

        if(user && user.password === password) {
            const token = await generateToken(email)
            console.log(token)
            return token
        } else throw new APIError("Invalid credentials", 401)

    }


    
}