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
        if(result === true) new APIResponse("kayıt başarılı", null).created(res)
    }

    async login (req : Request, res : Response) : Promise<void> {
        
    }

}

