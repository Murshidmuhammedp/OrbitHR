import { Schema, model, Document, Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

export interface ILeave extends Document {
  user: Types.ObjectId | IUser;
  fromDate: Date;
  toDate: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const leaveSchema = new Schema<ILeave>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Leave = model<ILeave>("Leave", leaveSchema);
