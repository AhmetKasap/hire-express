import express, { Router } from "express"
const userRouter : Router = express.Router()

import { UserService } from "../services/UserService"
import { UserController } from "../controllers/UserController"
import { tokenVerifiy } from "../middlewares/AuthMiddlewares"

const userController = new UserController(UserService)



userRouter.get('/', tokenVerifiy, userController.getProfile.bind(userController))
userRouter.put('/', tokenVerifiy, userController.editProfile.bind(userController))


export {userRouter}

