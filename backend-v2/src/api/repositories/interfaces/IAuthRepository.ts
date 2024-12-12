import { UserEntity } from "../../entities/UserEntity";

export interface IAuthRepository {
    create(user : UserEntity): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email : string) : Promise<UserEntity | null>
}