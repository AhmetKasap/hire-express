import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config'

const app = express();

app.use(express.json());



//!db connection
import { mongoDbConnection } from './config/db.connection';
mongoDbConnection()


// !Routes - Error Handler
import { indexRouter } from './routers/index.routes';
app.use(`/${process.env.API_NAME}/${process.env.API_VERSION}/`, indexRouter)

app.use((req : Request ,res : Response, next : NextFunction) => {
  res.send('not found url')
  next()
})

import errorHandler from './middlewares/ErrorHandler';
app.use(errorHandler)


const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})