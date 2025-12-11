import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { sendNewUserMail } from "../utils/mailer";
import { AuthRequest } from "../middlewares/authMiddleware";
import { HttpStatusCode } from "../constants/enums";
import { hrValidationSchema } from "../validators/userValidation";

export const createHR = async (req: AuthRequest, res: Response) => {
    try {
        const { error } = hrValidationSchema.validate(req.body);
        if (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.details[0].message });
        }
        const { name, email, phone_Number } = req.body;

        if (!name || !email || !phone_Number) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Name, email and Phone Number are required" });
        };

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "User with this email already exists" });
        }

        // generate a random temp password
        const tempPassword = crypto.randomBytes(4).toString("hex");
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const hrUser = await User.create({
            name,
            email,
            phone_Number,
            password: hashedPassword,
            role: "hr"
        });

        // send mail with username + temp password
        await sendNewUserMail({
            name,
            email,
            phone_Number,
            password: tempPassword,
            roleLabel: "HR"
        });

        return res.status(HttpStatusCode.CREATED).json({
            message: "HR user created and credentials emailed",
            hr: {
                id: hrUser._id,
                name: hrUser.name,
                phone_Number: hrUser.phone_Number,
                email: hrUser.email,
                role: hrUser.role
            }
        });
    } catch (error) {
        console.error("createHR error:", error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};
