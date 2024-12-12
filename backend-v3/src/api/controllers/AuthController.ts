import { inject, injectable } from "inversify";
import TYPES from "../../inversify/types";
import { IAuthService } from "../services/interfaces/IAuthService";
import { Request, Response } from "express";
import APIResponse from "../../shared/utils/APIResponse";
import { RegisterDTO } from "../dtos/auth/RegisterDTO";



@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private readonly authService : IAuthService) {}

    async register (req : Request, res : Response) : Promise<void> {
        const registerDTO : RegisterDTO = req.body

        const result = await this.authService.register(registerDTO)
        if(result === true) new APIResponse("registration successful", null).created(res)
    }

    async login (req : Request, res : Response) : Promise<void> {
        const loginDTO = req.body

        const result = await this.authService.login(loginDTO)

        const token = {token : result}

        if(result) new APIResponse('login successfully', token).ok(res)

        
    }

}

