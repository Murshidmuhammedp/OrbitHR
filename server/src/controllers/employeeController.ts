import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { User } from "../models/User";
import { Employee } from "../models/Employee";
import { Attendance } from "../models/Attendance";
import { Leave } from "../models/Leave";

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const user = await User.findById(userId).select("-password");
  const employee = await Employee.findOne({ user: userId });

  res.json({ user, employee });
};


export const clockIn = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const today = new Date().toISOString().split("T")[0];

  const already = await Attendance.findOne({ user: userId, date: today });
  if (already?.clockIn) {
    return res.status(400).json({ message: "Already clocked in today" });
  }

  const attendance =
    already ||
    new Attendance({
      user: userId,
      date: today
    });

  attendance.clockIn = new Date();
  await attendance.save();

  res.json({ message: "Clock-in successful", attendance });
};


export const clockOut = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({ user: userId, date: today });
  if (!attendance?.clockIn) {
    return res.status(400).json({ message: "Clock-in first" });
  }

  attendance.clockOut = new Date();

  const diffMs =
    attendance.clockOut.getTime() - attendance.clockIn.getTime();
  attendance.totalHours = Math.round((diffMs / 3600000) * 100) / 100;

  await attendance.save();

  res.json({ message: "Clock-out successful", attendance });
};


export const applyLeave = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { fromDate, toDate, reason } = req.body;

  if (!fromDate || !toDate || !reason) {
    return res.status(400).json({ message: "All fields required" });
  }

  const leave = await Leave.create({
    user: userId,
    fromDate,
    toDate,
    reason
  });

  res.status(201).json({
    message: "Leave applied successfully",
    leave
  });
};

export const getMyLeaves = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  const leaves = await Leave.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json({message:"Leave Data Fetched", leaves });
};



