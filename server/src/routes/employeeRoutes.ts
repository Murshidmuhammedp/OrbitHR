import { Router } from "express";
import { applyLeave, clockIn, clockOut, getMyLeaves, getMyProfile } from "../controllers/employeeController";

const router = Router();

router.get("/profile", getMyProfile);

router.post("/attendance/clock-in", clockIn);

router.post("/attendance/clock-out", clockOut);

router.post("/leave", applyLeave);

router.get("/leave", getMyLeaves);

export default router;