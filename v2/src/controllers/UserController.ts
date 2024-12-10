import { inject, injectable } from "inversify";
import TYPES from "../inversify/types";
import { IUserService } from "../services/interfaces/IUserService";
import { Request, Response } from "express";

@injectable()
export class UserController {
    constructor(@inject(TYPES.UserService) private readonly userService: IUserService) {}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json("error");
        }
    }


    async createUser(req : Request, res : Response) : Promise <void> {
        const {name, email, password} = req.body
        const registerDTO = {name,email,password}
         
        const newUser = await this.userService.createUser(registerDTO)
    }


    
}
