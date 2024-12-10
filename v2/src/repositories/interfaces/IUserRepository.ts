import { UserEntity } from "../../entities/UserEntity";

export interface IUserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    create(user : UserEntity): Promise<UserEntity | null>;
    update(id: string, user: UserEntity): Promise<UserEntity | null>;
    delete(id: string): Promise<boolean>;
}
