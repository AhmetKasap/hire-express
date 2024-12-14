import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import APIResponse from "../shared/utils/APIResponse";


export class AuthController {

    constructor(private readonly authService: AuthService) {}  


    async register(req: Request, res: Response) : Promise<void> {

      const {firstName, lastName, email, password} = req.body

      const registered = await this.authService.register(firstName, lastName, email, password)
      if(registered) new APIResponse("registration successful", registered).ok(res)

    }

        
      
}