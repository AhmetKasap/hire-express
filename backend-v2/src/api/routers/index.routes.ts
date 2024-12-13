import express from "express"
const indexRouter = express.Router()

import { authRouter } from "./auth.routes"

indexRouter.use('/auth', authRouter)



export{indexRouter}