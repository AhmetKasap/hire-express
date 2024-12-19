import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import APIResponse from "../shared/utils/APIResponse";


export class AuthController {

    constructor(private readonly authService: AuthService) {}  


    public async register(req: Request, res: Response) : Promise<void> {

      const {firstName, lastName, email, password} = req.body

      const registered = await this.authService.register(firstName, lastName, email, password)
      if(registered) new APIResponse("registration successful", registered).ok(res)

    }

    public async login(req : Request, res : Response) : Promise<void> {

      const result = await this.authService.login(req.body.email, req.body.password)
      const obj = {
        user : result.user,
        token : result.token
      }

      new APIResponse("login successfuly", obj).ok(res)

    }

        
      
}