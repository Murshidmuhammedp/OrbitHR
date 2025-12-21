import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import superAdminRoutes from "./routes/superAdminRoutes";
import hrRoutes from "./routes/hrRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import hrLeaveRoutes from "./routes/hrLeaveRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import 'colors';
import corsOptions from "./config/corsOptions";


// import cookieParser from "cookie-parser";
// import logger from "./middlewares/logger";
// import corsOptions from "./config/corsOptions"; 

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());
// app.use(logger);


app.use("/api/auth", authRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/hr", hrLeaveRoutes);

app.use(errorHandler);



export default app;
