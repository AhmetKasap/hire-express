import { Router } from "express";

import userRouter from "./user.routes";


const indexRouter = Router();

indexRouter.use('/users', userRouter)


export default indexRouter