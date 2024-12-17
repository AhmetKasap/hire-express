import express from "express"
const indexRouter = express.Router()

import { authRouter } from "./auth.routes"
import { userRouter } from "./user.routes"

indexRouter.use('/auth', authRouter)
indexRouter.use('/users', userRouter)



export{indexRouter}