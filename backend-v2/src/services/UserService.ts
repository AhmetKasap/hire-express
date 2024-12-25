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
        
        const updatedAvatar = await UserModel.findByIdAndUpdate(user._id, {$set : {'avatar' : avatar}}, { new: true }).select('avatar')
        return updatedAvatar

        
    }

    public async usersValidate (id : string) : Promise<any> {
        const objectId = await mongodbIdCheck(id)

        const user = await UserModel.findById(objectId)
        if (!user) throw new APIError('User not found', 404)
        
        return user

       
    }

    public async editUser(id : string, data : any) : Promise<any> {

        const objectId = await mongodbIdCheck(id)

        const user = await UserModel.findById(objectId)
        if (!user) throw new APIError('User not found', 404)

        const updatePayload  = {
            location: {
                country: data?.location?.country,
                city: data?.location?.city,
                state: data?.location?.state,
              },
              school: data?.school,
              work: data?.work,
              about: data?.about,
              language: data?.language
        }

        const userUpdated = await UserModel.findByIdAndUpdate(objectId, updatePayload, { new: true } )
        if(!userUpdated) throw new APIError('an error occurred during the update',500)
        return userUpdated

      
    }


    
}
