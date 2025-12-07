import mongoose from "mongoose";
import "colors";

export const connectDB = async (): Promise<void> => {
    try {
        if (process.env.MONGODB_URL) {
            await mongoose.connect(process.env.MONGODB_URL as string);
            console.log("Database connected successfully".bgYellow.bold);
        } else {
            throw new Error("MONGODB URL not defined");
        }
    } catch (error) {
        console.log("DB Connection failed:".red + error);
        process.exit(1);
    }
};