import { inject, injectable } from "inversify";
import { IAuthService } from "./interfaces/IAuthService";
import TYPES from "../../inversify/types";
import { IAuthRepository } from "../repositories/interfaces/IAuthRepository";
import { RegisterDTO } from "../dtos/auth/RegisterDTO";
import { plainToInstance } from "class-transformer";
import { UserEntity } from "../entities/UserEntity";

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


    async login() : Promise<any>{

    }
}