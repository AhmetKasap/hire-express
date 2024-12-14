import { UserModel } from "../models/User"
import APIError from "../shared/utils/APIError"

export class AuthService {

    public async register(firstName : string, lastName : string, email : string, password : string) : Promise<object> {

        const isUserAvailable = await UserModel.findOne({email : email})
        if(isUserAvailable) throw new APIError("user already registered",409)
        
        const createNewUser = await UserModel.create({firstName,lastName,email,password})
        return createNewUser

    }


    
}