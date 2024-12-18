import { Types } from 'mongoose';
import APIError from '../shared/utils/APIError';

const mongodbIdCheck = async(id : string) : Promise<Types.ObjectId> =>{
    if (!Types.ObjectId.isValid(id)) {
        throw new APIError('Invalid ID', 400)
    }

    const objectId = new Types.ObjectId(id) //string id to mongodb object id 
    

    return objectId

}

export {mongodbIdCheck}