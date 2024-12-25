import { Request, Response } from "express";
import { HostService } from "../services/HostService";
import APIResponse from "../shared/utils/APIResponse";
import APIError from "../shared/utils/APIError";

export class HostController {

    constructor (private readonly hostService : HostService) {}


    public async createHost (req : Request, res : Response) : Promise <void> {
        const authorizedUser = res.locals.authUser

        const dataToObject = JSON.parse(req.body.data)
        const data : object = {
            ...dataToObject,
            images : req.savedImages,
        }

        if(req.savedImages === undefined) throw new APIError("you must add at least 1 image when creating a host", 400)

        const createdHost = await this.hostService.createHost(authorizedUser._id, data)
        new APIResponse('host added successfully', createdHost).ok(res)
    }

    public async getHostByUsername (req : Request, res : Response) : Promise<void> {
        const authorizedUser = res.locals.authUser
        
        const result = await this.hostService.getHostByUsername(authorizedUser._id)
        if(result) new APIResponse("user's hosts", result).ok(res)


    }
    

    public async getHostById(req : Request, res : Response) : Promise<void> {

        const foundHost = await this.hostService.getHostById(req.params.id)
        if (foundHost) new APIResponse("found hosts", foundHost).ok(res) 

    }

    public async getAllHost(req : Request, res : Response) : Promise<void> {

        const allHosts = await this.hostService.getAllHost()
        if(allHosts) new APIResponse('found hosts', allHosts).ok(res)

    }


    

}




