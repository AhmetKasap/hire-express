import express, { Router } from "express"
const userRouter : Router = express.Router()

import { UserService } from "../services/UserService"
import { UserController } from "../controllers/UserController"
import { tokenVerifiy } from "../middlewares/AuthMiddlewares"
import { avatar } from "../libs/Multer"


const userService = new UserService()

const userController = new UserController(userService)


userRouter.get('/validate', tokenVerifiy, userController.usersValidate.bind(userController))
userRouter.put('/avatar', tokenVerifiy, avatar,  userController.editAvatar.bind(userController))
userRouter.put('/', tokenVerifiy, userController.editUser.bind(userController))
userRouter.get('/:id',  userController.getUserById.bind(userController))




export {userRouter}

