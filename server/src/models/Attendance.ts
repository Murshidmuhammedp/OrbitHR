import { Schema, model, Document, Types } from "mongoose";

export interface IAttendance extends Document {
  user: Types.ObjectId;
  date: string;
  clockIn?: Date;
  clockOut?: Date;
  totalHours?: number;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    clockIn: Date,
    clockOut: Date,
    totalHours: Number
  },
  { timestamps: true }
);

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
