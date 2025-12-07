import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants/enums";

export interface JwtPayload {
    userId: string;
    role: "superadmin" | "hr" | "employee";
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {

        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
    }

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        if (!decoded) {

            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Next is calling =======>", error);
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
};

