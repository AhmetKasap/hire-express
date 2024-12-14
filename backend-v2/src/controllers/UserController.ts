import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

    constructor (private readonly userService : UserService) {}


    public async editProfile(req : Request, res : Response) : Promise<void> {


    }

    
    public async getProfile(req : Request, res : Response) : Promise<void> {
        console.log(res.locals.authUser)

    }
}