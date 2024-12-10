import { inject, injectable } from "inversify";
import TYPES from "../inversify/types";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserEntity } from "../entities/UserEntity";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    async createUser(registerDTO : any): Promise<any> {
        return this.userRepository.create(registerDTO)
    }
}
