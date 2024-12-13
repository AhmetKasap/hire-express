import { AuthRepository } from "../repositories/AuthRepository";

export class AuthService {


    constructor(private readonly authRepository : AuthRepository) {}

    public async register(firstName : string, lastName : string, email : string, password : string) : Promise<any> {

        const isUserAvailable = await this.authRepository.findByEmail(email)
        if(isUserAvailable) console.log("error user zaten var") // throw error
        
        const createNewUser = await this.authRepository.create(firstName,lastName,email,password)
        return createNewUser


    }


    
}