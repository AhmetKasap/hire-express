import express from "express"

const authRouter = express.Router()

import { AuthController } from "../controllers/AuthController"
import { AuthService } from "../services/AuthService"
import { AuthRepository } from "../repositories/AuthRepository"

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

authRouter.post('/register', authController.register.bind(authController))
authRouter.post('/login', )




export {authRouter}