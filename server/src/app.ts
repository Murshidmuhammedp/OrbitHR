import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes"
import superAdminRoutes from "./routes/superAdminRoutes"

// import cookieParser from "cookie-parser";
// import logger from "./middlewares/logger";
// import corsOptions from "./config/corsOptions"; 


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());
// app.use(logger);

app.use("/api/auth", authRoutes);
app.use("api/superadmin", superAdminRoutes);


// app.use(errorHandler);

export default app;
