import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import container from "../../inversify/container";
import TYPES from "../../inversify/types";

import { registerValidation, loginValidation } from "../../validations/auth.validations";

const authRouter = Router()

const authController =  container.get<AuthController>(TYPES.AuthController)

authRouter.post("/login", (req, res) => authController.login(req, res))
authRouter.post('/register', registerValidation, (req,res) => authController.register(req,res))


export default authRouter   