import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { HttpStatusCode } from "../constants/enums";
import { AuthRequest, JwtPayload } from "../middlewares/authMiddleware";
import { User } from "../models/User";
import { Employee } from "../models/Employee";
import { sendNewUserMail } from "../utils/mailer";
import { employeeValidationSchema } from "../validators/employeeValidation";


export const createEmployee = async (req: AuthRequest, res: Response) => {
    try {
        const { error } = employeeValidationSchema.validate(req.body);
        if (error) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.details[0].message });
        }
        const { name, email, phone_Number, department, designation, salary } = req.body;

        if (!name || !email || !phone_Number || !department || !designation || !salary) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Email already exists" });
        }

        // Generate temp password
        const tempPassword = crypto.randomBytes(4).toString("hex");
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create login user
        const user = await User.create({
            name,
            email,
            phone_Number,
            password: hashedPassword,
            role: "employee"
        });

        // Create employee details
        const employee = await Employee.create({
            user: user._id,
            department,
            designation,
            salary,
            employeeCode: "EMP-" + Date.now()
        });

        // Send email to employee
        await sendNewUserMail({
            name,
            email,
            phone_Number,
            password: tempPassword,
            roleLabel: "Employee"
        });

        return res.status(HttpStatusCode.CREATED).json({
            message: "Employee created & credentials emailed",
            data: {
                id: employee._id,
                name: user.name,
                email: user.email,
                department: employee.department
            }
        });
    } catch (error) {
        console.log("createEmployee error:", error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};

export const getEmployees = async (req: AuthRequest, res: Response) => {
    try {
        const employees = await Employee.find()
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        return res.json({message:"Data Fetched", employees });
    } catch (error) {
        console.log("getEmployees error:", error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Server error" });
    }
};

