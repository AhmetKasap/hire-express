import express, { Request, Response } from 'express';
import 'dotenv/config'

const app = express();

app.use(express.json());

// !Routes
import { indexRouter } from './api/routers/index.routes';
app.use(`/${process.env.API_NAME}/${process.env.API_VERSION}/`, indexRouter)
//app.use("/api/v1", indexRouter)

//!db connection
import { mongoDbConnection } from './config/db.connection';
mongoDbConnection()



const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})