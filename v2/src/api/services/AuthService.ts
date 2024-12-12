import { inject, injectable } from "inversify";
import { IAuthService } from "./interfaces/IAuthService";
import TYPES from "../../inversify/types";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { RegisterDTO } from "../dtos/auth/RegisterDTO";
import { plainToInstance } from "class-transformer";
import { UserEntity } from "../entities/UserEntity";
import APIError from "../../shared/utils/APIError";

import {generateToken, checkToken} from "../../middlewares/auth.middleware"

@injectable()
export class AuthService implements IAuthService{

    constructor (@inject(TYPES.AuthRepository) private readonly authRepository : IAuthRepository ) {}

    async register(registerDTO : RegisterDTO) : Promise<boolean>{
        const userEntity  = new UserEntity(registerDTO.firstName, registerDTO.lastName, registerDTO.email, registerDTO.password)
        const result = await this.authRepository.create(userEntity)

        console.log(result)

        if(result ) return true
        else throw new Error("hata")

    }

    async login(loginDTO : any) : Promise<string>{

        const user = await this.authRepository.findByEmail(loginDTO.email)
        if(!user) throw new APIError('user not found ', 404) 

        if(user.password === loginDTO.password) return generateToken(user.email)
        else throw new APIError('şifre hatalı', 400)
        

    }
}