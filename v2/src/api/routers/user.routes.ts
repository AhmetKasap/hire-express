import { Router } from "express";
import container from "../../inversify/container";
import TYPES from "../../inversify/types";
import { UserController } from "../controllers/UserController";

const userRouter = Router();
const userController = container.get<UserController>(TYPES.UserController);

userRouter.get("/", (req, res) => userController.getAllUsers(req, res));

userRouter.post('/', (req,res) => userController.createUser(req,res))

export default userRouter;
