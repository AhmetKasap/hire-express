import { RegisterDTO } from "../../dtos/auth/RegisterDTO";
import { UserEntity } from "../../entities/UserEntity";

export interface IAuthService {
    register(registerDTO : RegisterDTO) : Promise<boolean>
    login() : Promise<UserEntity[]>
}