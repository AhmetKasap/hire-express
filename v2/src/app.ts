import express from "express";
import "reflect-metadata"; 



const app = express();
app.use(express.json());




import indexRouter from "./routers/index.routes";
app.use("/api/v1/", indexRouter);



//!mongodb connection
import { mongoDbConnection } from "./config/mongodb.connection";
mongoDbConnection()





const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



export default app;
