import { Router } from "express";
import { getAllLeaves, updateLeaveStatus } from "../controllers/hrLeaveController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roles";

const router = Router();

router.get("/leaves", authMiddleware, requireRole("hr"), getAllLeaves);

router.post("/leave/:leaveId", authMiddleware, requireRole("hr"), updateLeaveStatus);

export default router;