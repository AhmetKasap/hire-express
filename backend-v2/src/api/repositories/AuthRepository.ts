import { UserModel } from "../models/User";

export class AuthRepository {

    public async create(firstName : string, lastName : string, email : string, password : string) : Promise<any>{

        const newUser = await UserModel.create({
            firstName : firstName,
            lastName : lastName, 
            email : email, 
            password : password
        })

        const result = await newUser.save()
        return result

    }

    public async findByEmail(email : string) : Promise<any> {
        const isUserAvailable  = await UserModel.findOne({email : email})
        return isUserAvailable
    }





}