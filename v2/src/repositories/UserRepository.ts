import { injectable } from "inversify";
import { IUserRepository } from "./interfaces/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { UserModel } from "../models/user.model";

@injectable()
export class UserRepository implements IUserRepository {
    async findAll(): Promise<UserEntity[]> {
        return UserModel.find();
    }

    async findById(id: string): Promise<UserEntity | null> {
        return UserModel.findById(id);
    }

    async create(registerDTO : any): Promise<any> {
        return UserModel.create(registerDTO);
    }

    async update(id: string, user: UserEntity): Promise<UserEntity | null> {
        return UserModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id);
        return !!result;
    }
}
