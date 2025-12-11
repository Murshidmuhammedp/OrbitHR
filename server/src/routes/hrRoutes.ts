import { Router } from "express";
import { createEmployee, getEmployees } from "../controllers/hrController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roles";

const router = Router();

router.post("/employee", authMiddleware, requireRole("hr"), createEmployee);

router.get("/employees", authMiddleware, requireRole("hr"), getEmployees);

export default router;