import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

export default corsOptions;