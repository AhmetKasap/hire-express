import { injectable } from "inversify";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { UserEntity } from "../entities/UserEntity";
import { UserModel } from "../models/user.model";


@injectable()
export class AuthRepository implements IAuthRepository{


    async findById(id: string): Promise<UserEntity | null> {
        return UserModel.findById(id);
    }

    async create(user : UserEntity): Promise<UserEntity> {
        return UserModel.create(user)
    }

}