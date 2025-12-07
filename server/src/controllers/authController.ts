import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { JwtPayload } from "../middlewares/authMiddleware";
import { HttpStatusCode } from "../constants/enums";

/**
 * SUPER ADMIN REGISTRATION
 */

export const registerSuperAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, organization_Name, phone_Number, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const superAdmin = await User.create({
            name,
            email,
            // organization_Name,
            phone_Number,
            password: hashedPassword,
            role: "superadmin"
        });

        return res.status(201).json({
            message: "Super admin registered successfully",
            superAdmin: {
                id: superAdmin._id,
                name: superAdmin.name,
                // organization_Name: superAdmin.organization_Name,
                phone_Number: superAdmin.phone_Number,
                email: superAdmin.email
            }
        });
    } catch (error) {
        console.error("registerSuperAdmin error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * LOGIN (SuperAdmin / HR / Employee)
 */

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });

        if (!user.isActive)
            return res.status(403).json({ message: "Account is inactive" });

        const payload: JwtPayload = {
            userId: user._id.toString(),
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "7d"
        });

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                // organization_Name: user.organization_Name,
                phone_Number: user.phone_Number,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
