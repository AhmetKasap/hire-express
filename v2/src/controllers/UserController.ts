import { inject, injectable } from "inversify";
import TYPES from "../inversify/types";
import { IUserService } from "../services/interfaces/IUserService";
import { Request, Response } from "express";
import APIResponse from "../shared/utils/APIResponse";

@injectable()
export class UserController {
    constructor(@inject(TYPES.UserService) private readonly userService: IUserService) {}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        new APIResponse('ok', users).ok(res)
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        const registerDTO = { name, email, password };
        const newUser = await this.userService.createUser(registerDTO);
        new APIResponse("User created successfully", newUser).created(res);
    }
}
