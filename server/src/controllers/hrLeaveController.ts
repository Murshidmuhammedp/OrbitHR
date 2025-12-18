import { Request, Response } from "express";
import { Leave } from "../models/Leave";
import { AuthRequest } from "../middlewares/authMiddleware";
import { sendLeaveStatusMail } from "../utils/mailer";
import { IUser } from "../models/User";

export const getAllLeaves = async (req: AuthRequest, res: Response) => {
  try {
    const leaves = await Leave.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (error) {
    console.error("getAllLeaves error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateLeaveStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body; // approved | rejected

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findById(leaveId).populate<{ user: IUser }>("user", "name email");
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leave.status = status;
    await leave.save();

    // send email to employee
    await sendLeaveStatusMail({
      name: leave.user.name,
      email: leave.user.email,
      status,
      fromDate: leave.fromDate,
      toDate: leave.toDate
    });

    res.json({
      message: `Leave ${status} successfully`,
      leave
    });
  } catch (error) {
    console.error("updateLeaveStatus error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
