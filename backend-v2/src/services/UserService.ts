import { Types } from 'mongoose';
import { UserModel } from "../models/User";
import APIError from "../shared/utils/APIError";
import { mongodbIdCheck } from '../validations/mongodb.id.check';


export class UserService {

    public async getUserById (id: string): Promise<any> {
        const objectId = await mongodbIdCheck(id)
       
        const user = await UserModel.findById(objectId)
        if (!user) throw new APIError('User not found', 404)
        
        return user
    }

    public async editAvatar (id : string , avatar : string | undefined) : Promise<any> {

        const objectId = await mongodbIdCheck(id)

        const user = await UserModel.findById(objectId)
        if (!user) throw new APIError('User not found', 404)
        
        const updatedAvatar = await UserModel.findByIdAndUpdate(user._id, {$set : {'avatar' : avatar}}, { new: true })
        return updatedAvatar

        
    }


    
}
