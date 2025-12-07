import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { HttpStatusCode } from "../constants/enums";

export const requireRole = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!role || !allowedRoles.includes(role)) {
            return res.status(HttpStatusCode.FORBIDDEN).json({ message: "Access denied" });
        }
        next();
    };
};
