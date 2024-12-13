import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


export class AuthController {

    constructor(private readonly authService: AuthService) {}  


    async register(req: Request, res: Response) : Promise<any> {

      const {firstName, lastName, email, password} = req.body

      const registered = await this.authService.register(firstName, lastName, email, password)
      console.log(registered)

    }

        
      
}