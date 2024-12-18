import express from "express"
const hostRouter = express.Router()

import { HostController } from "../controllers/HostController"
import { HostService } from "../services/HostService"
import { tokenVerifiy } from "../middlewares/AuthMiddlewares"
import { images } from "../libs/Multer"
import { createHostValidation } from "../validations/HostValidation"

const hostService = new HostService()
const hostController = new HostController(hostService)


hostRouter.post('/', tokenVerifiy, createHostValidation, images, hostController.createHost.bind(hostController))
hostRouter.get('/', hostController.getAllHost.bind(hostController))
hostRouter.get('/:id', hostController.getHostById.bind(hostController))



export {hostRouter}