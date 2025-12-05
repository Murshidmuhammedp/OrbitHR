import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); 
// import cookieParser from "cookie-parser";
// import logger from "./middlewares/logger";
// import corsOptions from "./config/corsOptions"; 

import { connectDB } from "./config/connectDB";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());
// app.use(logger);


// app.use(errorHandler);

export default app;
