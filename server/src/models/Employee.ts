import { Schema, model, Document, Types } from "mongoose";

export interface IEmployee extends Document {
  user: Types.ObjectId;
  department: string;
  designation: string;
  salary: number;
  joinDate: Date;
  employeeCode: string;
}

const employeeSchema = new Schema<IEmployee>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: Date, default: Date.now },
    employeeCode: { type: String, unique: true }
  },
  { timestamps: true }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
