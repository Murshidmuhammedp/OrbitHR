import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes"
import superAdminRoutes from "./routes/superAdminRoutes"
import { errorHandler } from "./middlewares/errorHandler";
import 'colors';


// import cookieParser from "cookie-parser";
// import logger from "./middlewares/logger";
// import corsOptions from "./config/corsOptions"; 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());
// app.use(logger);

app.get("/test", (req, res) => {
    res.send("API working");
});




app.use("/api/auth", authRoutes);
// app.use("/api/superadmin", superAdminRoutes);


// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`.bgMagenta.bold);
});

export default app;
