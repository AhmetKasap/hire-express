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

      const token = await this.authService.login(req.body.email, req.body.password)
      const result = {token : token}

      new APIResponse("login successfuly", result).ok(res)

    }

        
      
}