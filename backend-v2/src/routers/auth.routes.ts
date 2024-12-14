import express from "express"

const authRouter = express.Router()

import { AuthController } from "../controllers/AuthController"
import { AuthService } from "../services/AuthService"

import { registerValidation, loginValidation } from "../validations/AuthValidation"

const authService = new AuthService()
const authController = new AuthController(authService)

authRouter.post('/register', registerValidation, authController.register.bind(authController))
authRouter.post('/login', loginValidation,authController.login.bind(authController))




export {authRouter}