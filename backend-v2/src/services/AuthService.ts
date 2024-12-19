import { UserModel } from "../models/User"
import APIError from "../shared/utils/APIError"

import { generateToken } from "../shared/helpers/generate.token"
import bcrypt from "bcrypt"
import { sendAcountVerificationEmail } from "../libs/NodeMailer"


export class AuthService {


    public async register(firstName : string, lastName : string, email : string, password : string) : Promise<object> {

        const isUserAvailable = await UserModel.findOne({email : email})
        if(isUserAvailable) throw new APIError("user already registered",409)

        const hashPassword = await bcrypt.hash(password,10)
        
        const createNewUser = await UserModel.create({firstName,lastName,email, password : hashPassword})

        //const result = await sendAcountVerificationEmail(createNewUser.email as string, "243")
       
        return createNewUser

    }


    public async login(email : string, password : string) : Promise<any> {

        const user = await UserModel.findOne({email : email})

        if(!user) throw new APIError('user not found', 404)

        const storedPassword = user.password as string

        const isPasswordValid  = await bcrypt.compare(password, storedPassword)

        if(user && isPasswordValid) {
            const token = await generateToken(email)
            return {token, user}
        } else throw new APIError("Invalid credentials", 401)

    }


    
}