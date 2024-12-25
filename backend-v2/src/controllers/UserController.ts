import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import APIResponse from "../shared/utils/APIResponse";

export class UserController {

    constructor (private readonly userService : UserService) {}


    public async getUserById(req : Request, res : Response) : Promise<void> {

        const user = await this.userService.getUserById(req.params.id)
        new APIResponse("USER", user).ok(res)
        
    }


    public async editAvatar(req : Request, res : Response) : Promise<void> {
        const authorizedUser = res.locals.authUser

        const avatar = req.file?.filename
        
        const updatedAvatar = await this.userService.editAvatar(authorizedUser._id, avatar)
        if(updatedAvatar) new APIResponse("avatar güncellendi", updatedAvatar).ok(res)
    
    }


    public async editProfile(req : Request, res : Response) : Promise<void> {


    }

    public async usersValidate(req : Request, res:Response) : Promise<void> {
        const authorizedUser = res.locals.authUser

        const user = await this.userService.usersValidate(authorizedUser._id)
        if (user) new APIResponse('user verification successful ', user).ok(res)
    }

    public async editUser (req : Request, res : Response) : Promise<void> {
        const authorizedUser = res.locals.authUser
        const data = req.body

        const updatedUser = await this.userService.editUser(authorizedUser._id, data)
        if(updatedUser) new APIResponse('updates users', updatedUser).ok(res)


    }



}