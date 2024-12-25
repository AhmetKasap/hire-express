import { HostModel } from "../models/Host";
import { UserModel } from "../models/User";
import APIError from "../shared/utils/APIError";
import { mongodbIdCheck } from "../validations/mongodb.id.check";
mongodbIdCheck

export class HostService {

    public async createHost (userId : string, data : object) : Promise<any> {

        const mongodbId = await mongodbIdCheck(userId)

        const user = await UserModel.findById(mongodbId)
        if(!user) throw new APIError('user not found', 404)
        
        
        const newHost = await HostModel.create({
            ...data,
            userRef : userId
        })
        const result = await newHost.save()
        return result
        
    }

    public async getHostByUsername (userId : string) : Promise<any> {
        const mongodbId = await mongodbIdCheck(userId)

        const user = await UserModel.findById(mongodbId)
        if(!user) throw new APIError('user not found', 404)

        const allHost = await HostModel.find({ userRef: mongodbId })
        if(allHost.length ===0) throw new APIError('not found host', 404)
        return allHost



    }

    public async getHostById(id : string) : Promise<any> {

        const mongodbId = await mongodbIdCheck(id)

        const foundHost = await HostModel.findById(mongodbId)
        if(!foundHost) throw new APIError('not found hosts', 404)
        return foundHost

    }

    public async getAllHost() : Promise<any> {

        const foundHost = await HostModel.find()
        if(!foundHost) throw new APIError('not found hosts', 404)
        return foundHost
        
    }

}