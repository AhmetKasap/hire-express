import { UserEntity } from "../../entities/UserEntity";

export interface IUserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    create(registerDTO : any): Promise<any>;
    update(id: string, user: UserEntity): Promise<UserEntity | null>;
    delete(id: string): Promise<boolean>;
}
