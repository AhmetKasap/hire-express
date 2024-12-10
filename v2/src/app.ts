import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata"; 

const app = express();
app.use(express.json());


//!mongodb connection
import { mongoDbConnection } from "./config/mongodb.connection";
mongoDbConnection()


//! routers

import indexRouter from "../src/api/routers/index.routes";
app.use("/api/v1/", indexRouter);

app.use((req : Request ,res : Response, next : NextFunction) => {
    res.send('not found url')
    next()
  })

import errorHandler from './middlewares/errorHandler';
app.use(errorHandler)



const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



export default app;
