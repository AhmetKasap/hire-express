import { Router } from "express";

const indexRouter = Router();

import userRouter from "./user.routes";
import authRouter  from "./auth.routes";


indexRouter.use('/users', userRouter)
indexRouter.use('/auth', authRouter)


export default indexRouter