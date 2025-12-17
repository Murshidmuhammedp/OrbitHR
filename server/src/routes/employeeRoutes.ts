import { Router } from "express";
import { applyLeave, clockIn, clockOut, getMyLeaves, getMyProfile } from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roles";

const router = Router();

router.get("/profile", authMiddleware, requireRole("employee"), getMyProfile);

router.post("/attendance/clock-in", authMiddleware, requireRole("employee"), clockIn);

router.post("/attendance/clock-out", authMiddleware, requireRole("employee"), clockOut);

router.post("/leave", authMiddleware, requireRole("employee"), applyLeave);

router.get("/leave", authMiddleware, requireRole("employee"), getMyLeaves);

export default router;