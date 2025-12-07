import { Schema, model, Document } from "mongoose";

export type UserRole = "superadmin" | "hr" | "employee";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String, required: true
        },
        email: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        role: {
            type: String,
            enum: ["superadmin", "hr", "employee"],
            default: "employee"
        },
        isActive: {
            type: Boolean, default: true
        }
    },
    { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
