import express from "express"
const indexRouter = express.Router()

import { authRouter } from "./auth.routes"
import { userRouter } from "./user.routes"
import { hostRouter } from "./host.routes"

indexRouter.use('/auth', authRouter)
indexRouter.use('/users', userRouter)
indexRouter.use('/hosts', hostRouter)



export{indexRouter}